import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  notes: [String],
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
