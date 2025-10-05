import { weatherApiKey } from "./script.js";

// -------------------------
// ENTER KEY LISTENER
// -------------------------
export function Enter(inputElement, callback) {
  inputElement.addEventListener("keydown", (e) => {
    if (e.key === "Enter") callback();
  });
}

// -------------------------
// GENERATE RANDOM CITY
// -------------------------
export function getRandomCity(cities, excludeCity = null) {
  const availableCities = excludeCity ? cities.filter(c => c !== excludeCity) : cities;
  const randomIndex = Math.floor(Math.random() * availableCities.length);
  return availableCities[randomIndex];
}

// -------------------------
// CONTAINER 1: MAIN CITY
// -------------------------
export function generateContainer1(container, weatherInfo, metrics) {
  container.innerHTML = `
    <div class="text-center p-5 city">${weatherInfo.location.name}, ${weatherInfo.location.country}</div>
    <div class="p-5">
      <p class="text-2xl font-bold text-center">${weatherInfo.current.condition.text}</p>
    </div>
    <div class="p-5">
      <img class="w-20" src="${weatherInfo.current.condition.icon}" alt="icon">
    </div>
    <div class="p-5">
      <p class="text-2xl">${Math.round(weatherInfo.current[`temp_${metrics.degree}`])}°${metrics.degree.toUpperCase()}</p>
    </div>
  `;
}

// -------------------------
// CONTAINER 4: FORECAST + EXTRA INFO
// -------------------------
export function generateContainer4(metrics, weatherInfo, inputBox) {
  // Update last updated info
  const lastUpdated = document.getElementById("last-updated");
  if (lastUpdated) {
    lastUpdated.innerHTML = `
      <p class="text-xs font-semibold text-gray-600">
        Last Updated: ${weatherInfo.current.last_updated}
      </p>
    `;
  }

  // Local time
  const localDate = new Date(weatherInfo.location.localtime);
  document.getElementById("time").textContent =
    `${localDate.getDate()} ${localDate.toLocaleString("en-US", { month: "short" })} ${localDate.getFullYear()}, ${localDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;

  // Forecast data (next 4 hours)
  const hourly = weatherInfo.forecast.forecastday[0].hour.slice(0, 4);
  const forecastContainer = document.getElementById("forecast-container");
  forecastContainer.innerHTML = "";

  hourly.forEach((hour, i) => {
    const card = document.createElement("div");
    card.className = "flex h-fit justify-around p-3 opacity-0 transition-opacity duration-500";
    card.innerHTML = `
      <div class="flex flex-col justify-between items-center h-1/2 w-1/2 basis-1/2">
        <h3 class="font-bold">${hour.time.split(" ")[1]}</h3>
        <p class="text-gray-600 text-[12px]">${localDate.toLocaleString("en-US", { month: "short" })}</p>
        <img src="${hour.condition.icon}" alt="icon" class="icon w-30">
        <p class="text-center capitalize text-[10px] sm:text-xs">${hour.condition.text}</p>
        <p>${Math.round(hour[`temp_${metrics.degree}`])}°${metrics.degree.toUpperCase()}</p>
      </div>
    `;
    forecastContainer.appendChild(card);
    setTimeout(() => card.classList.remove("opacity-0"), 100 * i);
  });

  // Other info section
  document.getElementById("other-info").innerHTML = `
    <div class="bg-gray-50 p-5 my-5 w-[100px] h-[100px] md:h-fit md:w-fit rounded-2xl flex flex-col justify-between items-center">
      <p class="text-[10px] md:text-xs font-medium">Wind Speed</p>
      <img class="w-[40px] md:w-[60px]" src="src/animated-weather-icons/wind.svg" alt="wind">
      <p class="text-xs"> ${weatherInfo.current[`wind_${metrics.speed}`]} ${metrics.speed}</p>
    </div> 
    <div class="bg-gray-50 p-5 my-5 w-[100px] h-[100px] md:h-fit md:w-fit rounded-2xl flex flex-col justify-between items-center">
      <p class="text-[10px] md:text-xs font-medium">Moon Phase</p>
      <img class="w-[40px] md:w-[60px]" src="src/animated-weather-icons/moon-phases/${weatherInfo.forecast.forecastday[0].astro.moon_phase}.svg" alt="moon phase">
      <p class="text-[10px] text-nowrap font-bold">${weatherInfo.forecast.forecastday[0].astro.moon_phase}</p>
    </div> 
    <div class="bg-gray-50 p-5 my-5 w-[100px] h-[100px] md:h-fit md:w-fit rounded-2xl flex flex-col justify-between items-center">
      <p class="text-xs">Humidity</p>
      <img class="w-[40px] md:w-[60px]" src="src/animated-weather-icons/humidity.svg" alt="loading..">
      <p class="text-xs">${weatherInfo.current.humidity}%</p>
    </div>
  `;

  // Weather condition icon
  const mainCityContainer = document.querySelector("#main-container .condition");
  if (mainCityContainer) {
    const dayTime = weatherInfo.current.is_day === 1 ? "day" : "night";
    mainCityContainer.innerHTML = `
      <p class="text-center capitalize text-xs">${dayTime}</p>
      <img src="src/animated-weather-icons/clear-${dayTime}.svg" class="pt-5 m-auto" alt="condition icon">
    `;
  }

  // Reset input
  inputBox.value = "";
}

// -------------------------
// CONTAINER 2: RANDOM CITY BOX
// -------------------------
export function generateContainer2(container, current, dayTime, info, time) {
  container.innerHTML = `
    <div class="flex justify-between mt-2 md:mt-5 mx-3 opacity-0 transition-opacity duration-500 md:mx-5">
      <h2 class="capitalize text-xs font-bold md:text-lg">${info.location.name}</h2>
      <p class="capitalize text-xs md:text-lg">${time}</p>
    </div>
    <div class="flex flex-col justify-center items-center w-full self-center opacity-0 transition-opacity duration-500">
      <img class="h-[60%] self-center" src="${current.condition.icon}" alt="icon">
      <p class="capitalize text-center px-5 text-xs font-bold md:text-lg">${current.condition.text}</p>
    </div>
    <div class="flex justify-between mb-2 mx-3 opacity-0 transition-opacity duration-500 md:mx-5">
      <p class="text-xs md:text-lg">${dayTime}</p>
      <p class="text-xs md:text-lg">
        ${Math.round(info.forecast.forecastday[0].day[`maxtemp_c`])}°C - ${Math.round(info.forecast.forecastday[0].day[`mintemp_c`])}°C
      </p>
    </div>
  `;
}
// -------------------------
// SEARCH SUGGESTION BOX
// -------------------------
const inputBox = document.getElementById("input");
const suggestionBox = document.createElement("ul");
suggestionBox.className =
  "absolute z-10 top-20 left-1/2 -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto w-[280px] hidden";

inputBox.parentElement.appendChild(suggestionBox);

inputBox.addEventListener("input", async () => {
  const query = inputBox.value.trim();
  if (query.length < 2) {
    suggestionBox.innerHTML = "";
    suggestionBox.classList.add("hidden");
    return;
  }
t
  try {
    const res = await fetch(`https://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${query}`);
    if (!res.ok) throw new Error("API Error");
    const data = await res.json();

    suggestionBox.innerHTML = "";
    if (data.length === 0) {
      suggestionBox.innerHTML = `<li class="px-3 py-2 text-gray-400 text-sm">No matches found</li>`;
    } else {
      data.slice(0, 5).forEach(city => {
        const li = document.createElement("li");
        li.textContent = `${city.name}, ${city.country}`;
        li.className = "px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm";
        li.addEventListener("click", () => {
          inputBox.value = city.name;
          suggestionBox.classList.add("hidden");
          document.getElementById("search-btn").click(); // trigger search
        });
        suggestionBox.appendChild(li);
      });
    }

    suggestionBox.classList.remove("hidden");
  } catch (err) {
    console.error("Suggestion API error:", err);
    suggestionBox.innerHTML = `<li class="px-3 py-2 text-gray-400 text-sm">Error loading suggestions</li>`;
    suggestionBox.classList.remove("hidden");
  }
});

document.addEventListener("click", (e) => {
  if (!inputBox.contains(e.target) && !suggestionBox.contains(e.target)) {
    suggestionBox.classList.add("hidden");
  }
});