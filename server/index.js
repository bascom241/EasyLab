import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './utils/connectDB.js';
import userRouter from './routes/userRouter.js'
import cookieParser from 'cookie-parser'
import sampleRouter from './routes/registerSampleRouter.js'


// Configuration
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());




app.use("/api", userRouter);
app.use("/api/sample", sampleRouter);
const port = process.env.PORT || 5000;
connectDb();


app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
})
