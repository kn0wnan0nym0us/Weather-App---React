import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'e5a70de06d953d2fad4c576d55292d06'; 
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'; 

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };
  console.log(`weather 1+1 API_URL`)
  const getWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          axios
            .get(`${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
            .then((response) => {
              setWeather(response.data);
              setError('');
            })
            .catch((error) => {
              setWeather(null);
              setError('Error retrieving weather data.');
            });
        },
        (error) => {
          setWeather(null);
          setError('Unable to retrieve location.');
        }
      );
    } else {
      setWeather(null);
      setError('Geolocation is not supported by your browser.');
    }
  };
  
  return (
    <div className="App">
      <h1>Weather App</h1>
      <input type="text" value={city} onChange={handleInputChange} />
      <button onClick={getWeather}>Get Weather</button>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
