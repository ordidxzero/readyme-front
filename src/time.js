const time = document.querySelector("span.profile__column__time");
const date = document.querySelector("span.profile__column__date");

if (time) {
  setInterval(() => {
    const dateObj = new Date();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    time.innerText = `${hour}:${minute.toString().padStart(2, "0")}`;
  }, 1000);
}

dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dateObj = new Date();

if (date) {
  date.innerText = `${dayNames[dateObj.getDay()]}, ${dateObj.getDate()}, ${
    months[dateObj.getMonth()]
  }`;
}
