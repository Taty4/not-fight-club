import { router } from "../router";

export class LoginPage {
  constructor() {
    this.render();
    this.listener();
  }

  render() {
    this.app = document.querySelector("#app");

    this.form = document.createElement("form");
    this.form.className = "form-login";

    this.input = document.createElement("input");
    this.input.type = "text";

    this.btnSubmit = document.createElement("button");
    this.btnSubmit.textContent = "Регистрация";
    this.btnSubmit.className = "submit-login";

    this.form.append(this.input, this.btnSubmit);

    this.app.append(this.form);
  }

  listener() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.input.value.length > 3) {
        localStorage.setItem(
          "currentName-taty4",
          JSON.stringify(this.input.value),
        );
        router.navigate("/home");
      } else {
        console.log("Введите имя длиннее 3 символов");
      }
    });
  }
}
