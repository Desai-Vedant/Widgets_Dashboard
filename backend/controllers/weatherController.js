import Weather from "../models/Weather.js";

export const updateWeather = async (req, res) => {
  // get the weather data from the request body
  // get user details from req.user
  // Check if user weather data already present
  // if present then update it else create a new entry

  try {
    const weather = req.body;
    const userId = req.user.id;
    const newWeatherData = {
      city: weather.name,
      temperature: weather.main.temp,
      condition: weather.weather[0].description,
      userId: userId,
    };

    const userWeatherData = await Weather.findOne({ userId: userId });

    if (!userWeatherData) {
      const savedWeatherData = await Weather.create(newWeatherData);
      if (savedWeatherData) {
        res.status(200).json(newWeatherData);
      } else {
        res.status(500).json({ message: "Server error!" });
      }
    } else {
      const updatedWeatherData = await Weather.updateOne(
        { userId: userId },
        newWeatherData
      );
      if (updatedWeatherData) {
        res.status(200).json(newWeatherData);
      } else {
        res.status(500).json({ message: "Server error!" });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating weather data", error });
  }
};

export const getWeather = async (req, res) => {
  try {
    const userId = req.user.id;
    const userWeatherData = await Weather.findOne({ userId: userId });
    if (userWeatherData) {
      res.status(200).json(userWeatherData);
    } else {
      res.status(200).json({ city: "Pune" }); // Return default city if no data found
    }
  } catch (error) {
    res.status(500).json({ message: "Error while getting data.", error });
  }
};
