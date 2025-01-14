import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  weather: { type: Boolean, default: false },
  note: { type: Boolean, default: false },
  task: { type: Boolean, default: false },
});

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

export default Dashboard;
