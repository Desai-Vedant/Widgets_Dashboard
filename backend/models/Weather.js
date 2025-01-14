import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
});

const Weather = mongoose.model("Weather", weatherSchema);

export default Weather;
