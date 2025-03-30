import mongoose from "mongoose";
import validator from 'validator';


const registerSampleSchema = new mongoose.Schema({
    surName: {
        type: String,
        required: [true, "surname is required"]
    },
    otherNames: {
        type: String,
        required: [true, "otherNames are required"]
    },
    age: {
        type: String,
        required: [true, "age is required"]
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "gender is required"]
    },
    hospitalNumber: {
        type: String,
        required: [true, "hospital number is required"]
    },
    occupation: {
        type: String,
        required: [true, "occupation is required"]
    },
    sampleInformation: {
        type: String,
        enum: ["serum","plasma", "blood", "protein"],
        required: [true, "sampleInformation is required"]
    },
    sampleStatus: {
        type: String,
        enum: ["accepted", "rejected"],
        required: [true, "sampleStatus is required"]
    },
    recieptNumber: {
        type: String,
        required: [true, "recieptNumber is required"]
    },
    patientType:{
        type:String,
        enum: ["Out Patient","In Patient"],
        required:[true, "patientType is required"]
    },
    ward: {
        type: String,
        enum: ["femaleSurgicalWard", "maleSurgicalWard", "ENT", "MOPD", "A&E", "O&G", "GOPD"],
        required: true
    },
    requestersInformation: {
        requestingDoctor: { type: String, required: true },
        consultant: { type: String, required: true }
    },
    testType: {
        type: [String],
        required: [true, "testType is required"]
    },
    dateOfSpecimen:{
        type:String
    }
},{timestamps:true});

const RegisterSample = mongoose.model("RegisterSample", registerSampleSchema);
export default RegisterSample;
