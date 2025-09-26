//enter key listener
export function Enter(value, callback){
  value.addEventListener('keydown',(Event)=>{
    if(Event.key === "Enter"){
      callback();
    }
  })
}

// Generate random city
export function getRandomCity(cities, excludeCity = null) {
  const availableCities = excludeCity ? cities.filter(c => c !== excludeCity) : cities;
  const randomIndex = Math.floor(Math.random() * availableCities.length);
  return availableCities[randomIndex];
}
// 

// generate container 1
export function generateContainer1(metrics,weatherInfo,inputBox,showRandomCity){
    document.querySelectorAll('.city').forEach(el =>{el.innerHTML = `${weatherInfo.location.name}, ${weatherInfo.location.country}`;})

    const localDate = new Date(weatherInfo.location.localtime);
    document.getElementById("time").textContent =`${localDate.getDate()} ${localDate.toLocaleString("en-US", { month: "short" })} ${localDate.getFullYear()}, ${localDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;

    const hourly = weatherInfo.forecast.forecastday[0].hour.slice(0, 4);
    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";
    const dayTime = weatherInfo.current.is_day === 1 ? "day" : "night";


    inputBox.value = "";

  // Show a random city immediately
showRandomCity(weatherInfo.location.name);

    hourly.forEach((hour, i) => {
        const card = document.createElement("div");
        card.className = "flex px-10 pt-5 h-fit justify-around opacity-0 transition-opacity duration-500";
        card.innerHTML = `
      <div class="flex flex-col justify-center items-center h-full w-fit">
        <h3 class="font-bold text-lg">${hour.time.split(" ")[1]}</h3>
        <p class="text-gray-600 text-[12px]">${localDate.toLocaleString("en-US", { month: "short" })}</p>
        <img src="${hour.condition.icon}" alt="icon" class="icon">
        <p class="text-center capitalize text-xs">${hour.condition.text}</p>
        <p>${Math.round(hour[`temp_${metrics.degree}`])}°${metrics.degree.toUpperCase()}</p>
      </div>`;

      
    forecastContainer.appendChild(card);

    document.getElementById("other-info").innerHTML = `
    <div class="bg-gray-50 p-5 rounded-2xl flex flex-col justify-between items-center ">
            <img src="src/animated-weather-icons/wind.svg" alt="wind">
            <p>${hour.wind_kph}kph</p>
        </div> 
        <div class="bg-gray-50 p-5 rounded-2xl flex flex-col justify-between items-center ">
            <img src="src/animated-weather-icons/wind.svg" alt="wind">
            <p>wind speed</p>
        </div> 
        <div class="bg-gray-50 p-5 rounded-2xl flex flex-col justify-between items-center ">
            <img src="src/animated-weather-icons/wind.svg" alt="wind">
            <p>wind speed</p>
        </div>
        `

    document.querySelector('.condition').innerHTML = `<p class="text-center capitalize text-xs">${hour.condition.text}</p>
    <img src="src/animated-weather-icons/clear-${dayTime}.svg" class="pt-5 m-auto"></img>`

    setTimeout(() => {
      card.classList.remove("opacity-0");
    }, 100 * i);
  });

}
// 

//generate container 2
export function generateContainer2(container,current,dayTime,info,time){

        container.innerHTML = `
          <div class="flex justify-between mt-5 mx-6 opacity-0 transition-opacity duration-500">
            <h2 class="capitalize">${info.location.name}</h2>
            <p class="capitalize">${time}</p>
          </div>
          <div class="flex flex-col justify-center items-center h-[60%] opacity-0 transition-opacity duration-500">
            <img src="${current.condition.icon}" alt="icon">
            <p class="capitalize text-center px-5">${current.condition.text}</p>
          </div>
          <div class="flex justify-between mt-5 mx-5 opacity-0 transition-opacity duration-500">
            <p>${dayTime}</p>
            <p>${Math.round(info.forecast.forecastday[0].day.maxtemp_c)} - ${Math.round(info.forecast.forecastday[0].day.mintemp_c)} °C</p>
          </div>`;
    
}