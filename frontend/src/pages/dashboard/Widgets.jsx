import React from "react";
import { Box, Typography } from "@mui/material";
import WeatherWidgetManager from "../../components/WeatherWidgetManager";
import TaskWidgetManager from "../../components/TaskWidgetManager";
import NoteWidgetManager from "../../components/NoteWidgetManager";

import Grid from "@mui/material/Grid2";

const Widgets = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          p: 1,
          pl: 4,
          textAlign: "left",
          width: "100%",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, ml: 0 }}>
          Widgets
        </Typography>
      </Box>
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3} width={"32%"}>
          <WeatherWidgetManager />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} width={"32%"}>
          <NoteWidgetManager />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} width={"32%"}>
          <TaskWidgetManager />
        </Grid>
      </Grid>
    </>
  );
};

export default Widgets;
