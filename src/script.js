import { Enter, generateContainer4, generateContainer2, generateContainer1 } from './functions.js';
import { getRandomCity } from './functions.js';

export const metrics = {
  degree: 'c',
  speed: 'kph'
};

const cities = ["London", "Paris", "New York", "Tokyo", "Chennai", "Sydney"];
const inputBox = document.getElementById("input");
const mainContainer = document.getElementById("main-container");
export const weatherApiKey = "f3463b6437ba4ab284272653252509";

function removeSkeleton(el) {
  el.classList.remove("skeleton-loader");
}

// -------------------------
// Fetch weather data
// -------------------------
async function getWeather(city) {
  try {
    const resp = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=7&aqi=no&alerts=yes`
    );

    if (!resp.ok) {
      throw new Error("City not found or API error");
    }

    return await resp.json();
  } catch (err) {
    console.error("Error fetching weather data:", err);
    return null;
  }
}




// -------------------------
// Show main city weather
// -------------------------
async function showWeather(city) {
  const weatherInfo = await getWeather(city);
  if (!weatherInfo || !weatherInfo.location) {
    alert("Weather data unavailable for this city.");
    return;
  }
 const dayTime = weatherInfo.current.is_day === 1 ? "day" : "night";

 document.getElementById("day-night-cycle").innerHTML = `
<img src="src/animated-weather-icons/clear-${dayTime}.svg" alt="${dayTime}">
 `

  // reusable class functions
document.querySelectorAll('.city').forEach(el => {
  el.innerHTML =` ${weatherInfo.location.name}, ${weatherInfo.location.country}`;
})
document.querySelectorAll('.condition').forEach(el => {
  el.innerHTML = weatherInfo.current.condition.text;
})

  mainContainer.innerHTML = `<p class="text-gray-500 text-center mt-10 animate-pulse">Loading...</p>`;
  generateContainer1(mainContainer, weatherInfo, metrics);
  generateContainer4(metrics, weatherInfo, inputBox);

  document.querySelectorAll('.skeleton').forEach(el => removeSkeleton(el));
  document.getElementById("cloud-vol").innerHTML = `${weatherInfo.current.cloud}%`;
  document.getElementById("snow-chances").innerHTML =  weatherInfo.forecast.forecastday[0].day.daily_chance_of_snow > 0 ? `${weatherInfo.forecast.forecastday[0].day.daily_chance_of_snow}%` : "none";

  showRandomCity(weatherInfo.location.name);
}

// -------------------------
// Show random city
// -------------------------
async function showRandomCity(mainCity) {
  const container1 = document.getElementById("random-city-container");
  const container2 = document.getElementById("random-city-container2");

  [container1, container2].forEach(cont => {
    cont.innerHTML = `<div class="flex justify-center items-center h-full w-full text-white text-lg animate-pulse opacity-0 transition-opacity duration-500">Loading...</div>`;
    const loader = cont.firstChild;
    requestAnimationFrame(() => loader.classList.remove("opacity-0"));
  });

  try {
    const availableCities = cities.filter(c => c !== mainCity);
    if (availableCities.length < 2) throw new Error("Not enough cities");

    const city1 = getRandomCity(availableCities);
    const city2 = getRandomCity(availableCities.filter(c => c !== city1));

    const [info1, info2] = await Promise.all([getWeather(city1), getWeather(city2)]);

    if (!info1 || !info2) throw new Error("Weather data unavailable");

    const updateContainer = (container, info) => {
      const current = info.current;
      const dayTime = current.is_day === 1 ? "Day" : "Night";
      const time = new Date(current.last_updated).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      generateContainer2(container, current, dayTime, info, time);
      [...container.children].forEach(child => requestAnimationFrame(() => child.classList.remove("opacity-0")));
    };

    updateContainer(container1, info1);
    updateContainer(container2, info2);
  } catch (err) {
    console.error("Random city error:", err);
    container1.innerHTML = container2.innerHTML =
      `<div class="flex justify-center items-center h-full w-full text-red-500 text-sm">Failed to load city</div>`;
  }
}

// -------------------------
// Event listeners
// -------------------------
function giveValue() {
  const city = inputBox.value || getRandomCity(cities);
  showWeather(city);
}

// -------------------------
// Input listener
// -------------------------
Enter(inputBox, giveValue);
document.getElementById("search-btn").addEventListener("click", giveValue);

// -------------------------
// On load
// -------------------------
window.addEventListener("load", () => {
  const city = getRandomCity(cities);
  showWeather(city);
});

// -------------------------
// Random city update every 10 seconds based on main city
// -------------------------
setInterval(() => {
  const cityEl = document.querySelector("#main-container .city"); // target only main container
  if (cityEl && cityEl.innerText) {
    const mainCity = cityEl.innerText.split(",")[0];
    showRandomCity(mainCity);
  }
}, 10000);