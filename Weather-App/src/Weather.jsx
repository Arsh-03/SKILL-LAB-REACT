import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Helper to map Open-Meteo WMO codes to descriptions and icons
const getWeatherDescription = (code) => {
  const descriptions = {
    0: { text: "Clear sky", icon: "01d" },
    1: { text: "Mainly clear", icon: "02d" },
    2: { text: "Partly cloudy", icon: "03d" },
    3: { text: "Overcast", icon: "04d" },
    45: { text: "Fog", icon: "50d" },
    48: { text: "Depositing rime fog", icon: "50d" },
    51: { text: "Drizzle: Light", icon: "09d" },
    53: { text: "Drizzle: Moderate", icon: "09d" },
    55: { text: "Drizzle: Dense", icon: "09d" },
    61: { text: "Rain: Slight", icon: "10d" },
    63: { text: "Rain: Moderate", icon: "10d" },
    65: { text: "Rain: Heavy", icon: "10d" },
    71: { text: "Snow: Slight", icon: "13d" },
    73: { text: "Snow: Moderate", icon: "13d" },
    75: { text: "Snow: Heavy", icon: "13d" },
    77: { text: "Snow grains", icon: "13d" },
    80: { text: "Rain showers: Slight", icon: "09d" },
    81: { text: "Rain showers: Moderate", icon: "09d" },
    82: { text: "Rain showers: Violent", icon: "09d" },
    85: { text: "Snow showers: Slight", icon: "13d" },
    86: { text: "Snow showers: Heavy", icon: "13d" },
    95: { text: "Thunderstorm: Slight or moderate", icon: "11d" },
    96: { text: "Thunderstorm with slight hail", icon: "11d" },
    99: { text: "Thunderstorm with heavy hail", icon: "11d" },
  };
  return descriptions[code] || { text: "Unknown", icon: "01d" };
};

const Weather = () => {
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Step 1: Use Open-Meteo Geocoding API to get coordinates
        const geoResponse = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
        );

        if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
          throw new Error("City not found");
        }

        const { latitude, longitude, name, country, country_code } = geoResponse.data.results[0];
        setLocation({ name, country, country_code });

        // Step 2: Fetch weather data using coordinates
        const weatherResponse = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m&timezone=auto`
        );

        setWeather(weatherResponse.data.current);
      } catch (err) {
        setError(err.message === "City not found" ? "City not found" : "Failed to fetch weather data");
        setWeather(null);
        setLocation(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [query]);

  const handleSearch = () => {
    if (city.trim()) {
      setQuery(city);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const weatherInfo = weather ? getWeatherDescription(weather.weather_code) : null;

  return (
    <div className="weather-app-container fade-in">
      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && (
        <div className="status-message">
          <p>Analyzing sky conditions...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && !weather && (
        <div className="status-message">
          <p>Discover the weather anywhere</p>
        </div>
      )}

      {weather && location && !loading && !error && (
        <div className="weather-content fade-in">
          <header className="weather-header">
            <h1 className="location-name">{location.name}</h1>
            <span className="country-tag">{location.country}</span>
          </header>

          <main className="main-weather">
            <img 
              src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@4x.png`} 
              alt={weatherInfo.text} 
              className="weather-icon"
            />
            <div className="temp-large">{Math.round(weather.temperature_2m)}°</div>
            <div className="condition-text">{weatherInfo.text}</div>
          </main>

          <footer className="weather-details-grid">
            <div className="detail-card">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{weather.relative_humidity_2m}%</span>
            </div>
            <div className="detail-card">
              <span className="detail-label">Wind</span>
              <span className="detail-value">{weather.wind_speed_10m} km/h</span>
            </div>
            <div className="detail-card">
              <span className="detail-label">Feels Like</span>
              <span className="detail-value">{Math.round(weather.apparent_temperature)}°C</span>
            </div>
            <div className="detail-card">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{Math.round(weather.surface_pressure)} hPa</span>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Weather;
