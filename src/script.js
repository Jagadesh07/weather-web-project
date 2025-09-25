
const cities = ["London", "Paris", "New York", "Tokyo", "Chennai", "Sydney"];

// Generate random city
function getRandomCity(excludeCity = null) {
  const availableCities = excludeCity ? cities.filter(c => c !== excludeCity) : cities;
  const randomIndex = Math.floor(Math.random() * availableCities.length);
  return availableCities[randomIndex];
}

// Fetch weather data
async function getWeather(city) {
  const weatherApiKey = "f3463b6437ba4ab284272653252509";
  try {
    const resp = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=7&aqi=no&alerts=no`
    );
    if (!resp.ok) throw new Error("City not found or API error");
    return await resp.json();
  } catch (err) {
    console.error(err);
  }
}

// Show main city weather
async function showWeather(city) {
  const inputBox = document.getElementById("input");
  const weatherInfo = await getWeather(city);
  if (!weatherInfo) return;

  document.getElementById("city").textContent = `${weatherInfo.location.name}, ${weatherInfo.location.country}`;

  const localDate = new Date(weatherInfo.location.localtime);
  document.getElementById("time").textContent =
    `${localDate.getDate()} ${localDate.toLocaleString("en-US", { month: "short" })} ${localDate.getFullYear()}, ${localDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;

  const hourly = weatherInfo.forecast.forecastday[0].hour.slice(0, 4);
  const forecastContainer = document.getElementById("forecast-container");
  forecastContainer.innerHTML = "";

  hourly.forEach((hour, i) => {
    const card = document.createElement("div");
    card.className = "flex px-10 pt-5 h-fit justify-around opacity-0 transition-opacity duration-500";
    card.innerHTML = `
      <div class="flex flex-col justify-center items-center h-full w-fit">
        <h3 class="font-bold text-lg">${hour.time.split(" ")[1]}</h3>
        <p class="text-gray-600 text-[12px]">${localDate.toLocaleString("en-US", { month: "short" })}</p>
        <img src="${hour.condition.icon}" alt="icon" class="icon">
        <p class="text-center capitalize text-xs">${hour.condition.text}</p>
        <p>${Math.round(hour.temp_c)}°C</p>
      </div>`;
    forecastContainer.appendChild(card);

    setTimeout(() => {
      card.classList.remove("opacity-0");
    }, 100 * i);
  });

  inputBox.value = "";

  // Show a random city immediately
  showRandomCity(weatherInfo.location.name);
}

// Show one random city
async function showRandomCity(mainCity) {
  const container = document.getElementById("random-city-container");
  container.innerHTML = `<div class="flex justify-center items-center h-full w-full text-white text-lg animate-pulse opacity-0 transition-opacity duration-500">Loading...</div>`;
  const loader = container.firstChild;
  requestAnimationFrame(() => loader.classList.remove("opacity-0"));

  const randomCity = getRandomCity(mainCity);
  const info = await getWeather(randomCity);
  if (!info) return;

  setTimeout(() => {
    const hour = info.current;
    const dayTime = info.current.is_day === 1 ? "Day" : "Night";

    container.innerHTML = `
      <div class="flex justify-between mt-5 mx-6 opacity-0 transition-opacity duration-500">
        <h2 class="text-white capitalize">${info.location.name}</h2>
        <p class="text-white capitalize">${hour.last_updated.split(" ")[1].toLocaleString('en-us',{hour: '2-digits' , minutes:'2-digits'})}</p>
      </div>
      <div class="flex flex-col justify-center items-center h-[60%] opacity-0 transition-opacity duration-500">
        <img src="${info.current.condition.icon}" alt="icon">
        <p class="text-white capitalize">${info.current.condition.text}</p>
      </div>
      <div class="flex justify-between mt-5 mx-5 opacity-0 transition-opacity duration-500">
        <p class="text-white">${dayTime}</p>
        <p class="text-white">${Math.round(info.forecast.forecastday[0].day.maxtemp_c)} - ${Math.round(info.forecast.forecastday[0].day.mintemp_c)} °C</p>
      </div>`;

    [...container.children].forEach(child => requestAnimationFrame(() => child.classList.remove("opacity-0")));
  }, 500);
}

// Event listeners
document.getElementById("search-btn").addEventListener("click", () => {
  const inputBox = document.getElementById("input");
  const city = inputBox.value || getRandomCity();
  showWeather(city);
});

// On load
window.addEventListener("load", () => {
  const city = getRandomCity();
  showWeather(city);
});

// Random city update every 10 seconds based on main city
setInterval(() => {
  const mainCity = document.getElementById("city").innerText.split(",")[0];
  showRandomCity(mainCity);
}, 10000);
