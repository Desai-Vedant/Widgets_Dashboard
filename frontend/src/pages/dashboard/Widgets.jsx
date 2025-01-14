import React from "react";

import WeatherWidgetManager from "../../components/WeatherWidgetManager";
import TaskWidgetManager from "../../components/TaskWidgetManager";
import NoteWidgetManager from "../../components/NoteWidgetManager";

import Grid from "@mui/material/Grid2";

const Widgets = () => {
  return (
    <Grid
      container
      direction="row"
      sx={{
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <Grid item xs={12} sm={6} md={4} lg={3} width={"30%"}>
        <WeatherWidgetManager />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} width={"30%"}>
        <NoteWidgetManager />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} width={"30%"}>
        <TaskWidgetManager />
      </Grid>
    </Grid>
  );
};

export default Widgets;
