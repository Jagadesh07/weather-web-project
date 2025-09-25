// node version
// async function getWeather(city) {
//   const weatherApiKey = "f3463b6437ba4ab284272653252509";
//   const resp = await fetch(
//     `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=7&aqi=no&alerts=no`
//   );

//   if (!resp.ok) {
//     throw new Error("City not found or API error");
//   }

//   const data = await resp.json();

//   const current = data.current || {};
//   const hourly = data.forecast.forecastday[0]?.hour || [];
//   const daily = data.forecast.forecastday || [];
//   const currentCondition = current.condition.text;
//   console.log("Current condition:", currentCondition);

//   return { current, hourly, daily };
// }

// const weatherInfo = getWeather("London")
//    .then(data => console.log("Weather data returned."))
//   .catch(err => console.error(err));
