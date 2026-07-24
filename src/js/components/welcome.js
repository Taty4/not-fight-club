import logoImg from "../../assets/images/logo-new.webp";

export class WelcomeElement {
  constructor() {
    this.element = document.createElement("div");
    this.element.className = "home-welcome";

    const logo = document.createElement("img");
    logo.src = logoImg;
    logo.className = "welcome-logo";

    const subLogo = document.createElement("p");
    subLogo.className = "sublogo-txt";
    subLogo.textContent = "Земля случайных встреч";

    this.element.append(logo, subLogo);
  }
}
