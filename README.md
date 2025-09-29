# Weather App 🌤️

A sleek and responsive **weather web application** built with **TailwindCSS** and JavaScript, powered by [WeatherAPI.com](https://www.weatherapi.com/). Get real-time weather updates, forecasts, and more for any location worldwide.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [API Reference](#api-reference)
- [Screenshots](#screenshots)
- [License](#license)

---

## Features

- **Current Weather Data**
  - Real-time temperature, weather conditions, humidity, and feels-like temperature.
  - Wind speed, direction, and atmospheric pressure.

- **Hourly & Daily Forecasts**
  - 24-hour hourly forecast with temperature, precipitation, and weather icons.
  - 7-day forecast showing highs, lows, and weather conditions.

- **Search Functionality**
  - Search by city or town name.
  - Auto-suggestions for faster results.

- **Geolocation Support**
  - Detects your current location and shows local weather automatically.

- **Weather Icons & Descriptions**
  - TailwindCSS-styled responsive icons for different weather conditions.
  - Clear descriptive text for current and forecasted weather.

- **Unit Conversion**
  - Toggle between Celsius (°C) and Fahrenheit (°F).
  - Wind speed in km/h, m/s, or mph.

- **Responsive & Modern Design**
  - Built with **TailwindCSS** for a mobile-first, responsive UI.
  - Clean layout with intuitive navigation.

- **Optional Enhancements**
  - Sunrise and sunset timings.
  - UV index and visibility.
  - Rain or snow alerts.

---

## Demo

View the live demo here: [Live Demo](#)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/weather-app.git

```
##Navigate to the project directory:
```bash
cd weather-app
```

##Install dependencies (if using Node.js):
```bash
npm install
```

##Add your WeatherAPI key in a .env file:
```bash
WEATHER_API_KEY=your_api_key_here
```
##tart the development server:
```bash
npm start
```

Usage

+Enter a city or town in the search bar and press Enter.

+Use the toggle to switch between Celsius and Fahrenheit.

+Scroll through hourly and daily forecasts for detailed predictions.

+Enable geolocation to view weather for your current location.

+Technologies Used

+Frontend: HTML, TailwindCSS, JavaScript

+API: WeatherAPI.com
+Icons: Weather icons from WeatherAPI or custom SVGs

+HTTP Requests: Fetch API or Axios

+API Reference

+WeatherAPI.com endpoints used:

+Current Weather: /current.json

+Forecast: /forecast.json

+Search Locations: /search.json

+For full documentation, visit: WeatherAPI Documentation
