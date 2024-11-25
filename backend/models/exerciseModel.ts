import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
  },
  user_id: {
    type: String,
    required: false,
  },
}, { collection: 'Exercise' }); // Ensure this points to the 'Exercise' collection

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
