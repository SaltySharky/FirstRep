import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "User id is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  }, 
},{ collection: 'User'});
  

export default mongoose.model("User", userSchema);