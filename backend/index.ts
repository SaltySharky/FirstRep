import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes"
import verifyToken from "./middleware/authMiddleware"
import { errorHandler } from "./middleware/errorMiddleware";
import connectDB from "./config/db";

connectDB();

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: `Authenticated` });
})

// Use the userRouter for routes related to user authentication
app.use('/api/users', userRoutes);

app.use(errorHandler);

// Start the server
const port = process.env.SERVER_PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

