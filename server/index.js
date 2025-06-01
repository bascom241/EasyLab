import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './utils/connectDB.js';
import userRouter from './routes/userRouter.js';
import cookieParser from 'cookie-parser';
import sampleRouter from './routes/registerSampleRouter.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import paymentRouter from './routes/paymentRouter.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = createServer(app);

// Connect to database
connectDb();

// Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: [
      "https://easy-lab-ui.onrender.com", 
      "http://localhost:3000"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export { io };

// Middleware configuration
app.use(cookieParser());
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: [
    "https://easy-lab-ui.onrender.com",
    "http://localhost:3000" 
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type", 
    "Authorization", 
    "X-Requested-With", 
    "Accept",
    "Cookie",
    "Set-Cookie"
  ]
};

app.use(cors(corsOptions));

// Preflight request handling
app.options('*', cors(corsOptions));

// Routes
app.use("/api", userRouter);
app.use("/api/sample", sampleRouter);
app.use("/api/payment", paymentRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});