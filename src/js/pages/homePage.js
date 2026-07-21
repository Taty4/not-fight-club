import { Header } from "../components/header";
import { router } from "../router";

export class HomePage {
  constructor() {
    this.render();
    this.listener();
  }

  listener() {
    this.btnBattle.addEventListener("click", () => {
      router.navigate("/battle");
    });
  }

  render() {
    this.app = document.querySelector("#app");

    this.header = new Header("home");

    this.btnBattle = document.createElement("button");
    this.btnBattle.textContent = "БОЙ";
    this.btnBattle.classList = "btn-battle";

    this.app.append(this.header.element, this.btnBattle);
  }
}
