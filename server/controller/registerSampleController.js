import RegisterSample from "../models/registerSampleSchema.js";
import asyncHandler from "express-async-handler";
import { validateSampleFields } from "../utils/validator.js";
import { io } from "../index.js";
import Notifications from "../models/notificatonSchema.js";
import Issue from "../models/issueSchema.js";
const requiredFields = [
    "surName",
    "otherNames",
    "age",
    "gender",
    "hospitalNumber",
    "occupation",
    "sampleInformation",
    "sampleStatus",
    "recieptNumber",
    "ward",
    "patientType",
    "dateOfSpecimen",
    "requestersInformation",
    "testType"
];
const registerSample = asyncHandler(async (req, res) => {
    try {


        if (!validateSampleFields(req.body, requiredFields) ||
            !req.body.requestersInformation?.requestingDoctor ||
            !req.body.requestersInformation?.consultant

        ) {
            console.log("Requesters Information:", req.body.requestersInformation);
            console.log(req.body)
            return res.status(400).json({ message: "All fields are required" });
        }

        const sampleData = requiredFields.reduce((acc, field) => {
            acc[field] = req.body[field];
            return acc;
        }, {});
        const newSample = new RegisterSample({
            ...sampleData,
            user: req.user.userId, // adapt based on your auth setup
        });

        await newSample.save();


        const notification = new Notifications({
            tittle: "New Sample Registered",
            message: `Sample with Consultant ${newSample.requestersInformation.consultant} has been registered`

        })

        await notification.save();

        io.emit("new-notification", {
            id: notification._id,
            title: notification.tittle,
            message: notification.message,
            createdAt: notification.createdAt,
            isRead: notification.isRead,
        })
        res.status(201).json({ message: "Congratulations! You have successfully saved your sample", sampleId: newSample._id });
    } catch (error) {
        console.error("Error registering sample:", error.message);
        res.status(500).json({ message: "An error occurred while registering the sample" });
    }
});

// Logic to Update Sample //

const updateSample = async (req, res) => {
    try {
        // Find the Particular Sample
        const { id } = req.params

        const updatedSample = await RegisterSample.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true });
        if (!updatedSample) {
            return res.status(401).json({ message: "sample not Found" })
        }
        res.status(202).json({ success: true, sample: updatedSample, message: "Sample Updated Successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


const getRegsteredSample = async (req, res) => {
    try {


        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;


        const { ward, sampleStatus, recieptNumber, sampleInformation } = req.query;

        let filter = {};

        if (ward) filter.ward = ward;
        if (sampleStatus) filter.sampleStatus = sampleStatus;
        if (recieptNumber) filter.recieptNumber = recieptNumber;
        if (sampleInformation) filter.sampleInformation = sampleInformation;




        // Sorting the Data =================================
        const samples = await RegisterSample.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalUsers = await RegisterSample.countDocuments(filter);

        res.status(200).json({ data: samples, totalPages: Math.ceil(totalUsers / limit), totalUsers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSample = async (req, res) => {
    const { id } = req.params;
    try {
        const sample = await RegisterSample.findById(id);
        if (!sample) {
            return res.status(404).json({ message: "Sample not found" });
        };

        res.status(200).json({ status: "success", sample })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const searchSample = async (req, res) => {
    const { query } = req.query;

    try {



        const samples = await RegisterSample.find({
            $or: [
                { surName: { $regex: query, $options: "i" } },
                { otherNames: { $regex: query, $options: "i" } },
                { occupation: { $regex: query, $options: "i" } },
                { ward: { $regex: query, $options: "i" } },
                { testType: { $regex: query, $options: "i" } }
            ]
        })

        if (!samples) {
            return res.status(401).json({ message: "Sample not Found" })
        }

        res.status(200).json({
            data: samples
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });

    }
};

const deleteSample = async (req, res) => {

    const { id } = req.params;
    try {
        const sample = await RegisterSample.findByIdAndDelete(id);

        if (!sample) {
            return res.status(404).json({ message: "Sample not found" })
        }
        res.status(200).json({ message: "Sample deleted successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}


// Notifications Logic 

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notifications.find().sort();
        if (!notifications) {
            return res.status(401).json({ message: "Notifications Not Found" })
        }
        res.status(200).json({ data: notifications, notificatonLength: notifications.length, message: "All Notifications" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteNotification = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await Notifications.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" })
        }
        res.status(200).json({ message: "Notification deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const markNotification = async (req,res) => {
    const {id} = req.params
    console.log(id)
    try {
        const notification = await Notifications.findById(id);
        console.log(notification)
        if(!notification) {
            return res.status(404).json({message:"Notification not Found"})
        }

        console.log(notification)

        if (notification.isRead) {
            return res.status(400).json({ message: "Notification already marked as read" });
          }
      
        notification.isRead = true;
        await notification.save();

        res.status(200).json({message:"Notification Read"})



    } catch (error) {
        res.status(500).json({message:error})
    }
}

const createIssue = async (req, res) => {
    try {
        const { sampleNumber, name, issueType, priorityLevel, issue, email } = req.body;
        const requiredFields = ['sampleNumber', 'name', 'issueType', 'priorityLevel', 'issue'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')}` });
        }

        const newIssue = new Issue({
            sampleNumber,
            name,
            issueType,
            priorityLevel,
            issue,
            email
        })
        await newIssue.save();
        res.status(201).json({ message: "Issue created successfully", issueId: newIssue._id });
    } catch (error) {
        console.error('Error creating issue:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getIssues = async (req, res) => {
    try {
        const issues = await Issue.find();
        if (!issues) {
            return res.status(401).json({ message: "Issues Not Found" })
        }
        res.status(200).json({ data: issues, issuesLength: issues.length, message: "All Issues" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const fetchReports = async (req, res) => {
    const { search } = req.query;


    try {
        // Query the DataBase for data that match the following
        const issues = await Issue.find({
            $or:[
                {issueType:{$regex: search, $options: "i"}},
                {priorityLevel:{$regex:search, $options: "i"}},
                // {sampleNumber:{$regex:search, $options: "i"}}
            ]
        });
        // I want to return empty Data if samples are not found
        if (issues.length < 1) {
            return res.status(404).json({issues:[], message: "No Sample Found"})
        }
        res.status(200).json({ issues })
    } catch (err) {
        // for debugging 
        console.log(err)
        res.status(500).json({message:"An nternal error Occured"})
    }


  




}
export { registerSample, getRegsteredSample, getSample, updateSample, searchSample, deleteSample, getNotifications, deleteNotification, createIssue, getIssues, fetchReports, markNotification };
