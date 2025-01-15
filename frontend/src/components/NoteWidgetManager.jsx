import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DummyNotesWidget from "./DummyNoteWidget";
import axios from "axios";

const NoteWidgetManager = () => {
  const addWidget = async () => {
    // Add current widget to dasahboard
    try {
      const response = await axios.post(
        "http://localhost:3000/api/dashboard/add",
        { widget: "note" },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error Updating Dashboard", error);
    }
  };
  const removeWidget = async () => {
    // Add current widget to dasahboard
    try {
      const response = await axios.post(
        "http://localhost:3000/api/dashboard/remove",
        { widget: "note" },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error Updating Dashboard", error);
    }
  };
  return (
    <Box
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <DummyNotesWidget />
      <Button
        variant="contained"
        color="primary"
        fullWidth={true}
        sx={{ mt: 2 }}
        onClick={addWidget}
      >
        Add to Dashboard
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth={true}
        sx={{ mt: 2 }}
        onClick={removeWidget}
      >
        Remove from Dashboard
      </Button>
    </Box>
  );
};

export default NoteWidgetManager;
