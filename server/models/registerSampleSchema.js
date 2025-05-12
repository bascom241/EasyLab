import mongoose from "mongoose";
import validator from 'validator';
import Payment from "./paymentSchema.js";
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
        required: [true, "gender is required "]
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
        consultant: { type: String, required: true },
    },
    testType: {
        type: [String],
        required: [true, "testType is required"]
    },
    dateOfSpecimen:{
        type:String
    },
    paid:{
        type:Boolean,
        default:false
    },
    paymentReference:{
        type:String,

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true});
// This is a bussiness logic before saving for payment Check
registerSampleSchema.pre("save", async function(next){
    const user = this.user;
    const now = new Date();
    const startsOfDay = new Date(now.setHours(0,0,0,0)) ;


    const activePayment = await Payment.findOne({
        user:user,
        status:"successful",
        expiryDate:{$gte:now}
    })

    if(activePayment){
        this.paid = true 
        this.paymentReference = activePayment.paymentReference
        return next()
    }

    console.log("Active Payment:", activePayment)

    const todaysSamplesCount = await RegisterSample.countDocuments({
        user,
        createdAt:{$gte:startsOfDay},
        paid:false
    });

    if (todaysSamplesCount >= 2) {
        throw new Error('Daily free sample limit reached. Please make a payment to continue.');
      }
      

      console.log("Sample Count:", todaysSamplesCount)
    next();

})

const RegisterSample = mongoose.model("RegisterSample", registerSampleSchema);
export default RegisterSample;
