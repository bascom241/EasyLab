import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

async function connectDb(){
    const url = process.env.MONGO_URL;
    try {
        await mongoose.connect(url);
        console.log("Connected to Database")
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDb;
