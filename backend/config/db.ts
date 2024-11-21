import mongoose from "mongoose";
const uri = process.env.MONGO_URI

if (!uri) {
  throw new Error("MONGO_URI is not defined");
}

const connectDB = async () => {
  // Connect to MongoDB
  mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));
}

export default connectDB;


