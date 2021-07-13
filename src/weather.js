import { weatherApi } from "./client";

const weatherIcon = document.querySelector("img.weather__img");
const weatherTemp = document.querySelector("span.weather__column__temp");
const weatherLocation = document.querySelector(
  "span.weather__column__location"
);

function paintWeather(data) {
  const {
    weather: {
      icon_url,
      temp,
      location: { country, city },
    },
  } = data;
  weatherIcon.src = icon_url;
  weatherTemp.innerText = temp > 0 ? `+${temp}` : temp;
  weatherLocation.innerText = `${city}, ${country}`;
}

if (weatherIcon && weatherTemp && weatherLocation) {
  weatherApi("Seoul").then(res => {
    const data = res.data.data;
    paintWeather(data);
  });
}
