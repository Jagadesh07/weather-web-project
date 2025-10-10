import { Enter, generateContainer4, generateContainer2, generateContainer1, getRandomCity  } from './functions.js';
export const metrics = {
  degree: 'c',
  speed: 'kph',
  size: 'mm'
};

const cities = ["London", "Paris", "New York", "Tokyo", "Chennai", "Sydney","Berlin"];
const inputBox = document.getElementById("input");
const mainContainer = document.getElementById("main-container");
export const weatherApiKey = "f3463b6437ba4ab284272653252509";

// remove-skeleton-loader
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

console.log(getWeather('chennai'));


// -------------------------
// Show main city weather
// -------------------------
async function showWeather(city) {
  const weatherInfo = await getWeather(city);
  if (!weatherInfo.location) {
    alert("Weather data unavailable for this city.");
    return;
  }
 const dayTime = weatherInfo.current.is_day === 1 ? "day" : "night";

//  day-night-cylce
 document.getElementById("day-night-cycle").innerHTML = `
<img src="src/icons/clear-${dayTime}.svg" alt="${dayTime}">`;

// dew-points
 document.getElementById("dew-point").innerHTML =
  `${weatherInfo.current[`dewpoint_${metrics.degree}`]}°${metrics.degree.toUpperCase()}`;
 document.getElementById("precip-point").innerHTML =
  `${weatherInfo.current[`precip_${metrics.size}`]}${metrics.size}`;

  // reusable class functions
document.querySelectorAll('.city').forEach(el => {
  el.innerHTML =` ${weatherInfo.location.name}, ${weatherInfo.location.country}`;
})
document.querySelectorAll('.condition').forEach(el => {
  el.innerHTML = weatherInfo.current.condition.text;
})

// pre-loading-await-data
  mainContainer.innerHTML = `<div class="flex justify-center items-center h-full w-full  animate-pulse"><img src="src/videos/loading.gif" alt="loading.." class="w-full rounded-2xl"></div>`;

  // generate the containers
  generateContainer1(mainContainer, weatherInfo, metrics);
  generateContainer4(metrics, weatherInfo, inputBox);

  // skeleton-loader
  document.querySelectorAll('.skeleton').forEach(el => removeSkeleton(el));

// cloud-snow-containers
  document.getElementById("cloud-vol").innerHTML = `${weatherInfo.current.cloud}%`;
  document.getElementById("snow-chances").innerHTML =  weatherInfo.forecast.forecastday[0].day.daily_chance_of_snow > 0 ? `${weatherInfo.forecast.forecastday[0].day.daily_chance_of_snow}%` : "none";

  showRandomCity(weatherInfo.location.name);
}

// -------------------------
// Show random city
// -------------------------
async function showRandomCity(mainCity) {
const container = document.querySelectorAll('.random-container')
  // convert to array
  container.forEach(cont => {

    // loading-content
    cont.innerHTML = `<div class="flex justify-center items-center h-full w-full animate-pulse opacity-0 transition-opacity duration-500">
  <img src="src/videos/loading.gif" alt="" class="w-1/2 rounded-2xl">
</div>`;

    // remove-the-animation
    const loader = cont.firstChild;
    requestAnimationFrame(() => loader.classList.remove("opacity-0"));

  });

  try {
    const availableCities = cities.filter(city => city !== mainCity);
    if (availableCities.length < 2) throw new Error("Not enough cities");
 
    container.forEach(async (container,index) => {
      const cityName = availableCities[index];
       const info = await getWeather(cityName);
    if (!info) throw new Error("Weather data unavailable");

    const updateContainer = (container, info ,cityName) => {
      const current = info.current;
      const dayTime = current.is_day === 1 ? "Day" : "Night";
      const time = new Date(current.last_updated).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      generateContainer2(container, current, dayTime, info, time);

      [...container.children].forEach(child => requestAnimationFrame(() => child.classList.remove("opacity-0")));

      container.addEventListener('click', () => {
        showWeather(cityName);
      })
    };

    updateContainer(container, info,cityName);

    }
  )
}

catch (err) {
    console.error("Random city error:", err);
    container.innerHTML =
      `<div class="flex justify-center items-center h-full w-full text-red-500 text-sm">Failed to load city</div>`;
  }
}

// -------------------------
// Event listeners
// -------------------------
function giveValue() {
  const city = inputBox.value;
  showWeather(city);
}

// -------------------------
// Input listener
// -------------------------
Enter(inputBox, giveValue);
document.getElementById("search-btn").addEventListener("click", () => {
   giveValue();

   if(!inputBox.value){
    document.getElementById("warnings").innerHTML = `Enter a city name to search`;
    setTimeout(() => {
    document.getElementById("warnings").innerHTML = ``;

    },5000);

   }
  
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
  const cityEl = document.querySelector("#main-container .city"); // target only main container
  if (cityEl && cityEl.innerText) {
    const mainCity = cityEl.innerText.split(",")[0];
    showRandomCity(mainCity);
  }
}, 60000);
// -------------------------
// SETTINGS BUTTON FUNCTION
// -------------------------

// Utility function to toggle between two buttons
function toggleButtons(activeBtn, inactiveBtn) {
  activeBtn.classList.add('bg-gray-100', 'text-black', 'shadow-md');
  inactiveBtn.classList.remove('bg-gray-100', 'text-black', 'shadow-md');
}

// --- SPEED ---
const btnKph = document.querySelector('.btn-option-kph');
const btnMph = document.querySelector('.btn-option-mph');

btnKph.addEventListener('click', () => toggleButtons(btnKph, btnMph));
btnMph.addEventListener('click', () => toggleButtons(btnMph, btnKph));

// --- DEGREE ---
const btnC = document.querySelector('.btn-option-c');
const btnF = document.querySelector('.btn-option-f');

btnC.addEventListener('click', () => toggleButtons(btnC, btnF));
btnF.addEventListener('click', () => toggleButtons(btnF, btnC));

// --- SIZE ---
const btnMm = document.querySelector('.btn-option-mm');
const btnIn = document.querySelector('.btn-option-in');

btnMm.addEventListener('click', () => toggleButtons(btnMm, btnIn));
btnIn.addEventListener('click', () => toggleButtons(btnIn, btnMm));

// ----------------
// SLIDER
// ----------------
const container = document.getElementById("top-cities-container");
const prevBtn = document.getElementById("slider-prev");
const nextBtn = document.getElementById("slider-next");

let currentTranslate = 0;
const moveAmount = 200;

// calculate max scroll distance
const maxTranslate = container.scrollWidth - container.clientWidth;

// Next button
nextBtn.addEventListener("click", () => {
  currentTranslate -= moveAmount;
  if (-currentTranslate > maxTranslate) currentTranslate = -maxTranslate;

  container.style.transform = `translateX(${currentTranslate}px)`;
});

// Prev button
prevBtn.addEventListener("click", () => {
  currentTranslate += moveAmount;
  if (currentTranslate > 0) currentTranslate = 0;

  container.style.transform = `translateX(${currentTranslate}px)`;
});