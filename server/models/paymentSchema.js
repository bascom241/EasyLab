import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    paymentReference:{
        type:String,
        required:[true, "Payment Refernce is required"],
        unique:true
    },
    amount:{
        type:Number,
        required:[true, "Amount is required"]
    },
    status:{
        type:String,
        enum:["pending", "successful", "failed"],
        default:"pending"
    },
    paymentDate:{
        type:Date,
        default:Date.now
    },
    expiryDate:{
        type:Date,
        required:true
    }

}, {
    timestamps:true
})

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment