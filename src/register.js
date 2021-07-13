import { signUpApi } from "./client";

const id = document.querySelector("input[name='id']");
const name = document.querySelector("input[name='name']");
const pw = document.querySelector("input[name='password']");
const confirmPw = document.querySelector("input[name='confirm_password']");
const submitBtn = document.querySelector(
  "button.login-container__form__button"
);
const errorMessage = document.querySelector("div.error-message");

if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    if ([id.value, name.value, pw.value, confirm.value].includes("")) {
      errorMessage.innerText = "빈칸이 없어야 합니다.";
      return;
    }
    if (pw.value !== confirmPw.value) {
      errorMessage.innerText = "비밀번호가 일치하지 않습니다.";
      return;
    }
    const payload = {
      username: id.value,
      name: name.value,
      password: pw.value,
    };
    signUpApi(payload)
      .then(res => {
        window.location.href = "./login.html";
      })
      .catch(e => {
        errorMessage.innerText = e.response.data.message;
      });
  });
}

window.addEventListener("keypress", () => {
  errorMessage.innerText = "";
});
