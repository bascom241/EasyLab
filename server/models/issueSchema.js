import mongoose from "mongoose";
import validator from "validator";
const issueSchema = new mongoose.Schema({
    sampleNumber:{
        type:String,
        required:[true, "Sample Number is Required"]
    },
    name:{
        type:String,
        required:[true, "Name is Required"]
    },
    issueType:{
        type:String,
        required:[true, "Issue Type is Required"]
    },
    priorityLevel:{
        type:String,
        enum:["low", "medium", "high"],
        required:[true, "Priority Level is Required"]
    },
    issue:{
        type:String ,
        required:[true, "Issue is required"]
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true,
        validate:{
            validator:(v)=>{
                return validator.isEmail(v)
            },
            message:(props)=> `${props.v} is not a valid email address`
        }
    }
});

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;