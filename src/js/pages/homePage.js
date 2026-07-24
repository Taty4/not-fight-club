import { Header } from "../components/header";
import { router } from "../router";
import { WelcomeElement } from "../components/welcome";

export class HomePage {
  constructor() {
    this.render();
    this.listener();
  }

  listener() {
    this.btnNewBattle.addEventListener("click", () => {
      localStorage.removeItem("currentBattle-taty4");
      router.navigate("/battle");
    });

    this.btnContinueBattle.addEventListener("click", () => {
      router.navigate("/battle");
    });

    this.btnCharacter.addEventListener("click", () => {
      router.navigate("/character");
    });

    this.btnSetting.addEventListener("click", () => {
      router.navigate("/setting");
    });
  }

  render() {
    this.app = document.querySelector("#app");

    const wrapperContent = document.createElement("div");
    wrapperContent.className = "wrapper-content";

    const welcome = new WelcomeElement();

    const descriptionGame = document.createElement("p");
    descriptionGame.textContent =
      "Добро пожаловать в Землю случайных встреч. Здесь судьба решает, кто окажется твоим противником.";
    descriptionGame.className = "home-description";

    welcome.element.append(descriptionGame);

    const wrapperBtns = document.createElement("div");
    wrapperBtns.className = "wrapper-home-btns";

    this.btnNewBattle = document.createElement("button");
    this.btnNewBattle.textContent = "Новый бой";
    this.btnNewBattle.classList = "home-btn-new-battle";

    this.btnContinueBattle = document.createElement("button");
    this.btnContinueBattle.textContent = "Продолжить бой";
    this.btnContinueBattle.classList = "home-btn-continue-battle";
    this.btnContinueBattle.disabled = !localStorage.getItem(
      "currentBattle-taty4",
    );

    this.btnCharacter = document.createElement("button");
    this.btnCharacter.textContent = "Персонаж";
    this.btnCharacter.classList = "home-btn-character";

    this.btnSetting = document.createElement("button");
    this.btnSetting.textContent = "Настройки";
    this.btnSetting.classList = "home-btn-setting";

    wrapperBtns.append(
      this.btnNewBattle,
      this.btnContinueBattle,
      this.btnCharacter,
      this.btnSetting,
    );
    wrapperContent.append(welcome.element, wrapperBtns);
    this.app.append(wrapperContent);
  }
}
