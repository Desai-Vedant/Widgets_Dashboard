import {
  Box,
  Typography,
  TextField,
  List,
  Checkbox,
  ListItem,
  Button,
  ListItemText,
} from "@mui/material";

function DummyTaskWidget() {
  const tasks = { "Sample Task": false, "Another Task": true };
  return (
    <Box
      id="task"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
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
      <Typography variant="h6" component="div" sx={{ p: 1, height: 50 }}>
        Task Manager
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
        <TextField id="new-task" label="New Task" sx={{ width: "100%" }} />
        <Button variant="contained">{"Add Task"}</Button>
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
        {Object.keys(tasks).map((taskName) => (
          <ListItem
            key={taskName}
            secondaryAction={
              <Button variant="contained" color="error">
                Delete
              </Button>
            }
          >
            <Checkbox checked={tasks[taskName]} />
            <ListItemText primary={taskName} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default DummyTaskWidget;
