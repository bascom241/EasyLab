import RegisterSample from "../models/registerSampleSchema.js";
import asyncHandler from "express-async-handler";
import { validateSampleFields } from "../utils/validator.js";

const registerSample = asyncHandler(async (req, res) => {
    try {
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

        res.status(201).json({ message: "Congratulations! You have successfully saved your sample", sampleId:newSample._id});
    } catch (error) {
        console.error("Error registering sample:", error);
        res.status(500).json({ message: "An error occurred while registering the sample" });
    }
});



const getRegsteredSample = async (req,res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;


        const {ward, sampleStatus,recieptNumber,sampleInformation} = req.query;
        
        let filter = {};

        if(ward)filter.ward = ward;
        if(sampleStatus)filter.sampleStatus = sampleStatus;
        if(recieptNumber)filter.recieptNumber = recieptNumber;
        if(sampleInformation)filter.sampleInformation = sampleInformation;

        
        

        // Sorting the Data =================================
        const samples = await RegisterSample.find(filter).sort({ createdAt:-1}).skip(skip).limit(limit);
        const totalUsers = await RegisterSample.countDocuments(filter);
        
        res.status(200).json({data:samples,totalPages: Math.ceil(totalUsers/limit),totalUsers});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getSample = async (req,res) => {
    const  {id} = req.params;
    try {
        const sample = await RegisterSample.findById(id);
        if(!sample){
            return res.status(404).json({message:"Sample not found"});
        };

        res.status(200).json({status:"success",sample})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
export {registerSample, getRegsteredSample,getSample};
