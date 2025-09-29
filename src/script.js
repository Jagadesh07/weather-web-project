import{ Enter, generateContainer4, generateContainer2, generateContainer1 } from './functions.js';
import { getRandomCity } from './functions.js';

export const metrics = {
  degree:'c',
  speed:'kph'
};
const cities = ["London", "Paris", "New York", "Tokyo", "Chennai", "Sydney"];
const inputBox = document.getElementById("input");
const mainContainer = document.getElementById("main-container");
export const weatherApiKey = "f3463b6437ba4ab284272653252509";

// -------------------------
// Fetch weather data
// -------------------------
async function getWeather(city) {
  try {
    const resp = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=7&aqi=no&alerts=no`
    );

    if (!resp.ok) {
      alert("Enter a valid city name or check spelling.");
      throw new Error("City not found or API error");
    }

    return await resp.json();
  } catch (err) {
    console.error("Error fetching weather data:", err);
    return null; // return null so your other functions know it failed
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
 mainContainer.innerHTML = `<p class="text-gray-500 text-center mt-10 animate-pulse">Loading...</p>`;
  generateContainer1(mainContainer,weatherInfo,metrics);
  generateContainer4(metrics,weatherInfo,inputBox,showRandomCity);
}
// 


// -------------------------
// Show random city
// -------------------------
async function showRandomCity(mainCity) {
  const container = document.getElementById("random-city-container");
  const containerTwo = document.getElementById("random-city-container2");

  [container, containerTwo].forEach(cont => {
    cont.innerHTML = `<div class="flex justify-center items-center h-full w-full text-white text-lg animate-pulse opacity-0 transition-opacity duration-500">Loading...</div>`;
    const loader = cont.firstChild;
    requestAnimationFrame(() => loader.classList.remove("opacity-0"));
  });

  const availableCities = cities.filter(c => c !== mainCity);
  const city1 = availableCities[Math.floor(Math.random() * availableCities.length)];
  

  const city2Options = availableCities.filter(c => c !== city1);
  const city2 = city2Options[Math.floor(Math.random() * city2Options.length)];


  const info1 = await getWeather(city1);
  const info2 = await getWeather(city2);
  if (!info1 || !info2) return;


  function updateContainer(container, info) {
    const current = info.current;
    const dayTime = current.is_day === 1 ? "Day" : "Night";
    const time = new Date(current.last_updated).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    generateContainer2(container,current,dayTime,info,time);
    
    [...container.children].forEach(child => requestAnimationFrame(() => child.classList.remove("opacity-0")));
  }

  updateContainer(container, info1);
  updateContainer(containerTwo,info2);
} 
// 

// -------------------------
// Event listeners
// -------------------------
function giveValue(){
  const city = inputBox.value || getRandomCity(cities);
  showWeather(city);
}
// 

// -------------------------
//input listener
// -------------------------
 Enter(inputBox,giveValue);

document.getElementById("search-btn").addEventListener("click", () => {
 giveValue();
});

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
const cityEl = document.querySelector(".city");
  if (cityEl) {
    const mainCity = cityEl.innerText.split(",")[0];
    showRandomCity(mainCity);
  }
}, 10000);