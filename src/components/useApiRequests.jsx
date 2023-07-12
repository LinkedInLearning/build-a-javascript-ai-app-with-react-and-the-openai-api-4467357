import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LocationToCoordinates from "./LocationToCoordinates";
import WeatherData from "./WeatherData";
import PromptToLocation from "./PromptToLocation";
import WeatherDescript from "./WeahterDescript";

const useApiRequests = (prompt) => {
  const [error, setError] = useState(null);
  const [promptData, setPromptData] = useState({});
  const [locationData, setLocationData] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [weatherDescription, setWeatherDescription] = useState(null);

  // Fetch location and weather data from API.
  useEffect(() => {
    const fetchData = async () => {
      if (!prompt) return; // return if prompt is null or undefined

      try {
        const promptDataRes = await PromptToLocation(prompt);
        setPromptData(promptDataRes);

        const locationDataRes = await LocationToCoordinates(
          promptDataRes.locationString
        );
        setLocationData(locationDataRes);

        const weatherDataRes = await WeatherData(locationDataRes);
        setWeatherData(weatherDataRes);

        const weatherDescriptRes = await WeatherDescript(
          prompt,
          weatherDataRes
        );
        setWeatherDescription(weatherDescriptRes);
      } catch (error) {
        setError(error);
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [prompt]); // run effect when `prompt` changes

  return { error, promptData, locationData, weatherData, weatherDescription };
};

useApiRequests.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default useApiRequests;
