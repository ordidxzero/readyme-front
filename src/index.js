import dotenv from "dotenv";
dotenv.config();
import "./weather";
import "./movie";
import "./review";
import "./time";
import "./utils";

function profileElement(profile_url) {
  const div = document.querySelector("header div.profile");
  const loginBtn = div.querySelector("a.login__btn");
  div.removeChild(loginBtn);
  const img = document.createElement("img");
  img.classList.add("profile__img");
  img.src = profile_url;
  div.prepend(img);
}

function checkLogin() {
  const user = JSON.parse(localStorage.getItem("readyme"));
  if (user !== null) {
    profileElement(user.profile_url);
  }
}

if (
  location.pathname !== "/login.html" &&
  location.pathname !== "/register.html"
) {
  checkLogin();
}
