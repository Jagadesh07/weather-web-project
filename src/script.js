import{ Enter, generateContainer1, generateContainer2 } from './functions.js';
import { getRandomCity } from './functions.js';

const metrics = {
  degree:'c',
  speed:'kph'
};
const cities = ["London", "Paris", "New York", "Tokyo", "Chennai", "Sydney"];
const inputBox = document.getElementById("input");


// Fetch weather data
async function getWeather(city) {
  const weatherApiKey = "f3463b6437ba4ab284272653252509";
  try {
    const resp = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=7&aqi=no&alerts=no`
    );
    if (!resp.ok) throw new Error("City not found or API error",alert("enter a valid city (or) check your spelling"));
    return await resp.json();
  } catch (err) {
    console.error(err);
  }
}
// 

// Show main city weather
async function showWeather(city) {
  const inputBox = document.getElementById("input");
  const weatherInfo = await getWeather(city);
  if (!weatherInfo) return;

  generateContainer1(metrics,weatherInfo,inputBox,showRandomCity);
}
// 

// Show random city
async function showRandomCity(mainCity) {
  const container = document.getElementById("random-city-container");
  const containerTwo = document.getElementById("random-city-container2");

  // Show loading for both containers
  [container, containerTwo].forEach(cont => {
    cont.innerHTML = `<div class="flex justify-center items-center h-full w-full text-white text-lg animate-pulse opacity-0 transition-opacity duration-500">Loading...</div>`;
    const loader = cont.firstChild;
    requestAnimationFrame(() => loader.classList.remove("opacity-0"));
  });

  // Pick two different random cities, excluding the main city
  const availableCities = cities.filter(c => c !== mainCity);
  const city1 = availableCities[Math.floor(Math.random() * availableCities.length)];
  
  // For the second city, exclude both mainCity and city1
  const city2Options = availableCities.filter(c => c !== city1);
  const city2 = city2Options[Math.floor(Math.random() * city2Options.length)];

  // Fetch weather for both cities
  const info1 = await getWeather(city1);
  const info2 = await getWeather(city2);
  if (!info1 || !info2) return;

  // Helper to update container content
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


// Event listeners
function giveValue(){
  const city = inputBox.value || getRandomCity(cities);
  showWeather(city);
}
// 

//input listener
 Enter(inputBox,giveValue);
document.getElementById("search-btn").addEventListener("click", () => {
 giveValue();
});

// On load
window.addEventListener("load", () => {
  const city = getRandomCity(cities);
  showWeather(city);
});

// Random city update every 10 seconds based on main city
setInterval(() => {
  const mainCity = document.getElementById("city").innerText.split(",")[0];
  showRandomCity(mainCity);
}, 10000);
