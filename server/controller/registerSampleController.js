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
            "requestersInformation",
            "testType"
        ];

        if (!validateSampleFields(req.body, requiredFields) ||
            !req.body.requestersInformation?.requestingNumber ||
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

        res.status(201).json({ message: "Congratulations! You have successfully saved your sample" });
    } catch (error) {
        console.error("Error registering sample:", error);
        res.status(500).json({ message: "An error occurred while registering the sample" });
    }
});

export default registerSample;
