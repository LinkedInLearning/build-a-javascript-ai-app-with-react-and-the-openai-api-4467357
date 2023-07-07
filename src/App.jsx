import { useEffect, useState } from "react";
import "./App.css";
import useApiRequests from "./components/useApiRequests";
import WeatherForm from "./components/WeatherForm";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [prompt, setPrompt] = useState("");
  const [units, setUnits] = useState("metric");
  const [weatherDataLoading, setWeatherDataLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Custom hook to handle API requests. Fires when prompt changes.
  const { error, locationData, weatherData } = useApiRequests(prompt);

  // Set error message if error is returned from API request.
  useEffect(() => {
    if (error) {
      setErrorMsg(error);
      setWeatherDataLoading(false);
    }
  }, [error]);

  // Set weatherDataLoading to false when weatherData is returned from API request.
  useEffect(() => {
    if (weatherData) {
      setWeatherDataLoading(false);
    }
  }, [weatherData]);

  // Handle form submission. Set prompt to user input.
  const handleSubmit = (newPrompt) => {
    setErrorMsg("");
    setWeatherDataLoading(true);
    setPrompt(newPrompt);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="page-title">Current Weather</h1>
        <WeatherForm onSubmit={handleSubmit} />
        {error && <p className="error">{errorMsg.message}</p>}
      </header>
      <main className="main-content">
        {weatherData.name && !errorMsg ? (
          <WeatherCard
            isLoading={weatherDataLoading}
            data={weatherData}
            units={units}
            country={locationData[0].country}
            USstate={locationData[0].state}
            setUnits={setUnits}
          />
        ) : (
          <WeatherCard isLoading={weatherDataLoading} setUnits={setUnits} />
        )}
      </main>
    </div>
  );
}

export default App;
