import mongoose, { mongo } from 'mongoose';
import validator from 'validator'

// Nigerian Phone Number Regex //
const phoneRegex = /^(?:\+234|0)[789][01]\d{8}$/; 

const userSchema = new mongoose.Schema({
    fullName:{
        type:String, 
        required:[true, "FullName is Required"],
        trim:true
    },
   
    email:{
        type:String,
        required:[true, "Email is Required"],
        unique:true,
        validate:{
            validator:(v)=> {
                return validator.isEmail(v)
            },
            message:(props)=> `${props.v} is not a valid email address`
        },
    }, 
    phoneNumber:{
        type:String,
        required: true,
        unique:true,
        validate:{
            validator: (v) =>{
                return phoneRegex.test(v)
            },
            message:(props)=> `${props.v} is not a valid Nigerian Phone Number`
        }
    },
    facilityName:{
        type:String,
        required:[true, "Facilty Name is Required"],

    },
    facilityNumber:{
        type:String,
        required:[true,"Facility Number is Required"]
    },
    departmentName:{
        type:String,
        required:[true,"Department Name is Required"]
    },
    role:{
        type:String,
        enum:["admin", "receptionist", "scientist"],
        default:"admin"
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
        minLength:[8, "Password must be at least 8 characters"]
    },

    lastLogin:{
        type:Date,
        default:Date.now()
    },

    isVerified:{
        type:Boolean, 
        default:false
    },
    resetPasswordToken:String,
    resetPasswordExpiresDate:Date,
    verificationToken:String,
    verificationTokenExpiresDate:Date
    
})


const User = mongoose.model("User", userSchema);
export default User;