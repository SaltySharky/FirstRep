import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "User id is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  level: {
    type: String,
    default: "",
  },
  frequency: {
    type: String,
    default: "",
  },
  intensity: {
    type: String,
    default: "",
  },
  total_workouts: {
    type: Number,
    default: 0,
  },
  streaks: {
    type: Number,
    default: 0,
  }
},{ collection: 'User'});
  

export default mongoose.model("User", userSchema);