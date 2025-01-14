import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const NoteWidget = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Function to get note data from database
  const getNotesData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/note/getdata",
        {},
        { withCredentials: true }
      );
      setNotes(response.data.notes || []);
      console.log(response.data.notes);
    } catch (error) {
      console.error("Failed to Get Notes List", error);
    }
  };

  // Function to Update notes data on database
  const updateNotesData = async (notesData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/note/update",
        notesData,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Failed to update the backend:", error);
    }
  };

  const handleAddNote = () => {
    setNotes([...notes, newNote]);
    setNewNote("");
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((note, i) => i !== index));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const notesData = notes;
      updateNotesData(notesData);
    }, 500); // Avoid frequent requests
    return () => clearTimeout(timeout);
  }, [notes]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getNotesData();
    }, 500); // Avoid frequent requests
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box
      sx={{
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        maxWidth: 400,
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Note Taking Widget
      </Typography>
      <TextField
        label="Add a new note"
        value={newNote}
        variant="outlined"
        onChange={(e) => setNewNote(e.target.value)}
        sx={{ width: "100%", marginBottom: 2 }}
      />
      <Button
        variant="contained"
        onClick={handleAddNote}
        sx={{ marginBottom: 2 }}
      >
        Add Note
      </Button>
      {notes.map((note, index) => (
        <Box
          key={index}
          sx={{
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
            marginBottom: 2,
          }}
        >
          <Typography variant="body1">{note}</Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteNote(index)}
          >
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default NoteWidget;
