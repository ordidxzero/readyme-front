import { signInApi } from "./client";

const id = document.querySelector("input[name='id']");
const pw = document.querySelector("input[name='password']");
const submitBtn = document.querySelector(
  "button.login-container__form__button"
);
const errorMessage = document.querySelector("div.error-message");

if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    if ([id.value, pw.value].includes("")) {
      errorMessage.innerText = "빈칸이 없어야 합니다.";
      return;
    }
    const payload = {
      username: id.value,
      password: pw.value,
    };
    signInApi(payload)
      .then(res => {
        const data = res.data;
        localStorage.setItem("readyme", JSON.stringify(data));
        window.location.href = "./index.html";
      })
      .catch(e => {
        errorMessage.innerText = e.response.data.message;
      });
  });
}

window.addEventListener("keypress", () => {
  errorMessage.innerText = "";
});
