import RegisterSample from "../models/registerSampleSchema.js";
import asyncHandler from "express-async-handler";
import { validateSampleFields } from "../utils/validator.js";


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

        const newSample = new RegisterSample(sampleData);
        await newSample.save();

        res.status(201).json({ message: "Congratulations! You have successfully saved your sample", sampleId: newSample._id });
    } catch (error) {
        console.error("Error registering sample:", error);
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

const deleteSample = async (req,res) => {

    const {id} = req.params;
    try {
        const sample = await RegisterSample.findByIdAndDelete(id); 

        if(!sample){
            return res.status(404).json({message:"Sample not found"})
        }
        res.status(200).json({message:"Sample deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
}
export { registerSample, getRegsteredSample, getSample, updateSample, searchSample, deleteSample};
