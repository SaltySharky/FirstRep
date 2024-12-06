import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
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
}, { collection: 'Workouts' }); // Ensure this points to the 'Exercise' collection

const Workout = mongoose.model('Workouts', workoutSchema);
export default Workout;