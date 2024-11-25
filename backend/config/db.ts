import mongoose from "mongoose";
const uri = process.env.MONGO_URI

if (!uri) {
  throw new Error("MONGO_URI is not defined");
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;

