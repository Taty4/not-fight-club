import { router } from "../router";
import logoImg from "../../assets/images/logo-new.webp";

export class Header {
  element;
  constructor() {
    this.element = document.createElement("div");
    this.create();
    this.listener();
  }

  listener() {
    this.btnHome.addEventListener("click", () => {
      router.navigate("/home");
    });

    this.btnCharacter.addEventListener("click", () => {
      router.navigate("/character");
    });

    this.btnSetting.addEventListener("click", () => {
      router.navigate("/setting");
    });
  }

  create() {
    this.element.className = "header";

    const containerLogo = document.createElement("div");
    containerLogo.className = "container-logo";

    const logo = document.createElement("img");
    logo.src = logoImg;
    logo.className = "logo";

    const subLogo = document.createElement("p");
    subLogo.className = "sublogo-txt";
    subLogo.textContent = "Земля случайных встреч";

    containerLogo.append(logo);

    const containerHeaderBtns = document.createElement("div");
    containerHeaderBtns.className = "header-container-btn";

    this.btnHome = document.createElement("button");
    this.btnHome.className = "header-btn-home";

    this.btnSetting = document.createElement("button");
    this.btnSetting.className = "header-btn-setting";

    this.btnCharacter = document.createElement("button");
    this.btnCharacter.className = "header-btn-character";

    containerHeaderBtns.append(
      this.btnHome,
      this.btnCharacter,
      this.btnSetting,
    );

    this.element.append(containerLogo, containerHeaderBtns);
  }
}
