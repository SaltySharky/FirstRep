import mongoose from 'mongoose';

const scrapeSchema = new mongoose.Schema({
  exercise_name: {
    type: String,
    required: false,
  },
  image_url: {
    type: String,
    required: false,
  },
  image_url_2: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  
}, { collection: 'Scrape' }); // Ensure this points to the 'Exercise' collection

const Scrape = mongoose.model('Scrape', scrapeSchema);
export default Scrape;    