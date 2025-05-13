import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './utils/connectDB.js';
import userRouter from './routes/userRouter.js'
import cookieParser from 'cookie-parser'
import sampleRouter from './routes/registerSampleRouter.js'
import {createServer} from 'http';
import { Server } from 'socket.io';
import paymentRouter from './routes/paymentRouter.js'
dotenv.config();
const app = express();
const server = createServer(app);


connectDb();
const io = new Server(server, {cors:{
    origin:"http://localhost:3000",
    credentials:true
}})

io.on("connection",(socket)=>{
    // console.log("User Conneted", socket.id);

    socket.on("disconnect",()=>{
        // console.log("User disconnect:", socket.id)
    })
})

export {io}
// Configuration

app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000","http://localhost:3001"], credentials: true }));
app.use(express.json());




app.use("/api", userRouter);
app.use("/api/sample", sampleRouter);
app.use("/api/payment", paymentRouter);
const port = process.env.PORT || 5000;



server.listen(port, () =>{
    console.log(`Listening on port ${port}`);
})
