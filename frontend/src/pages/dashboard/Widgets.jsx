import React from "react";

import WeatherWidgetManager from "../../components/WeatherWidgetManager";
import TaskWidgetManager from "../../components/TaskWidgetManager";
import NoteWidgetManager from "../../components/NoteWidgetManager";

const Widgets = () => {
  return (
    <div>
      <WeatherWidgetManager />
      <NoteWidgetManager />
      <TaskWidgetManager />
    </div>
  );
};

export default Widgets;
