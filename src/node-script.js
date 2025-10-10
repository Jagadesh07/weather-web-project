// // ✅ Only for Node.js (no DOM or browser code here)

// // WeatherAPI key and settings
// const weatherApiKey = "f3463b6437ba4ab284272653252509";
// const fs = require("fs");

// const metrics = {
//   degree: "c",
//   speed: "kph",
//   size: "mm",
// };

// // -------------------------
// // Fetch weather data
// // -------------------------
// async function getWeather(city) {
//   try {
//     const resp = await fetch(
//       `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=7&aqi=no&alerts=yes`
//     );

//     if (!resp.ok) {
//       throw new Error("City not found or API error");
//     }

//     return await resp.json(); // ✅ real JSON object
//   } catch (err) {
//     console.error("Error fetching weather data:", err);
//     return null;
//   }
// }

// // -------------------------
// // Main function
// // -------------------------
// async function saveWeatherData() {
//   const inputCity = "Chennai";
//   const weatherData = await getWeather(inputCity);

//   if (!weatherData) {
//     console.error("❌ Failed to fetch weather data.");
//     return;
//   }

//   const jsonResp = JSON.stringify(weatherData, null, 2);
//   fs.writeFileSync("weather2.json", jsonResp);
//   console.log("✅ JSON file saved successfully!");
// }

// // Run the async function
// saveWeatherData();
