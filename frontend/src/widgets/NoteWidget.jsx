import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ListItem,
  TextField,
  Typography,
  List,
} from "@mui/material";
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
    const notesData = notes;
    const data = updateNotesData(notesData);
  }, [notes]);

  useEffect(() => {
    const data = getNotesData();
  }, []);

  return (
    <Box
      id="note"
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ccc",
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "auto",
        width: "100%",
        height: "100%",
        textAlign: "center",
        minHeight: 300,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Note Taking Widget
      </Typography>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
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
      </Box>

      <List
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: 0,
          marginTop: 2,
          scrollbarWidth: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "4px",
          },
        }}
      >
        {notes.map((note, index) => (
          <ListItem key={index} sx={{ width: "100%" }}>
            <Box
              sx={{
                padding: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                marginBottom: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="body1" sx={{ width: "calc(100% - 120px)" }}>
                {note}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteNote(index)}
                sx={{ marginLeft: 2, width: 100 }}
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NoteWidget;
