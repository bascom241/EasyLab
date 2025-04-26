import mongoose, { mongo } from 'mongoose'

const notificationSchema = new mongoose.Schema({
    tittle:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    isRead:{
        type:Boolean,
        default:false
    }
})

const Notifications = mongoose.model("Notifications", notificationSchema);
export default Notifications


