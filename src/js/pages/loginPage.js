import { router } from "../router";
import { WelcomeElement } from "../components/welcome";
import sounds from "../audioManager";

export class LoginPage {
  constructor() {
    this.render();
    this.listener();
  }

  render() {
    this.app = document.querySelector("#app");

    const wrapperContent = document.createElement("div");
    wrapperContent.className = "wrapper-content";

    this.form = document.createElement("form");
    this.form.className = "form-login";

    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.className = "input-login";

    this.warning = document.createElement("span");
    this.warning.textContent = "Введите имя длиннее 2-ух символов";
    this.warning.className = "warning-login hidden";

    this.btnSubmit = document.createElement("button");
    this.btnSubmit.textContent = "Регистрация";
    this.btnSubmit.className = "submit-login";

    this.form.append(this.input, this.warning, this.btnSubmit);

    const welcome = new WelcomeElement();
    wrapperContent.append(welcome.element, this.form);
    this.app.append(wrapperContent);
  }

  listener() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.input.value.length > 2) {
        this.warning.classList.add("hidden");
        localStorage.setItem(
          "username-taty4",
          JSON.stringify(this.input.value),
        );
        router.navigate("/home");
        sounds.playBgmMusic();
      } else {
        this.warning.classList.remove("hidden");
      }
    });
  }
}
