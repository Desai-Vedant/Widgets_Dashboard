import {
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
} from "@mui/material";

function DummyNotesWidget() {
  const notes = ["Sample Note"];
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
          variant="outlined"
          sx={{ width: "100%", marginBottom: 2 }}
        />
        <Button variant="contained" sx={{ marginBottom: 2 }}>
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
                onClick={() => {}}
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
}

export default DummyNotesWidget;
