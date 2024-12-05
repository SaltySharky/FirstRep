import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import userRoutes from "./routes/userRoutes"
import verifyToken from "./middleware/authMiddleware"
import { errorHandler } from "./middleware/errorMiddleware";
import connectDB from "./config/db";
import exerciseRoutes from "./routes/exerciseRoutes";

connectDB();

const app = express();

// app.use(cors({
//   origin: "http://localhost:3000/",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));

// Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Protect all the routes with verifyToken
app.use(verifyToken);

// Routes related to user authentication
app.use('/api/users', userRoutes);

app.use(exerciseRoutes);

app.use(errorHandler);

// Start the server
const port = process.env.SERVER_PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

