import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes"
import verifyToken from "./middleware/authMiddleware"
import { errorHandler } from "./middleware/errorMiddleware";
import connectDB from "./config/db";
import exerciseRoutes from "./routes/exerciseRoutes";
import mongoose from "mongoose";
import { registerUser } from './controllers/userController';

import cors from "cors";



const app = express();

// Enable CORS for all origins (or restrict to specific origins)
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true, 
}));
connectDB();

// Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: `Authenticated` });
})

// Use the userRouter for routes related to user authentication
app.use('/api/users', userRoutes);

app.use(exerciseRoutes);


app.use(errorHandler);

// Start the server
const port = process.env.SERVER_PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

