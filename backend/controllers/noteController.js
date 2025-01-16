import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const notesData = await Note.findOne({ userId });
    if (!notesData) {
      return res.status(200).json({ notes: [] }); // Return empty list if no notes found
    }
    return res.status(200).json({ notes: notesData.notes }); // Return the user's notes
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const notesData = await Note.findOne({ userId });

    if (!notesData) {
      // If no notes exist for the user, create a new record
      await Note.create({ userId, notes: req.body });
      return res.status(201).json({ message: "Notes created successfully" });
    } else {
      // If notes exist update the record
      const updateResult = await Note.updateOne(
        { userId },
        { notes: req.body }
      );
      if (updateResult.matchedCount === 0) {
        return res
          .status(404)
          .json({ message: "Notes not found for the user" });
      }
      return res.status(200).json({ message: "Notes updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
