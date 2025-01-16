import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
      default: "Pune",
    },
    weatherData: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true, // timestamps for tracking data
  }
);

const Weather = mongoose.model("Weather", weatherSchema);

export default Weather;
