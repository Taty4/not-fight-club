class Header {
  element;
  constructor() {
    this.element = document.createElement("div");
  }

  create() {
    this.element.className = "header";

    this.btnHome = document.createElement("button");
    this.btnHome.textContent = "Домой";
    this.btnHome.className = "btn-home";

    const logo = document.createElement("img");
    logo.src = "./assets/images/logo.webp";
    logo.className = "logo";

    this.leftPart = document.createElement("div");
    this.leftPart.className = "header-left";
    this.rightPart = document.createElement("div");
    this.rightPart.className = "header-right";

    this.btnSetting = document.createElement("button");
    this.btnSetting.textContent = "Настройки";
    this.btnSetting.className = "btn-setting";

    this.btnCharacter = document.createElement("button");
    this.btnCharacter.textContent = "Персонаж";
    this.btnCharacter.className = "btn-character";

    const rightWrapper = document.createElement("div");
    rightWrapper.className = "header-right-wrapper";
    rightWrapper.append(this.btnSetting, this.btnCharacter);

    this.leftPart.append(this.btnHome);
    this.rightPart.append(rightWrapper);

    this.element.append(this.leftPart, logo, this.rightPart);
  }

  listeners() {
    this.btnHome.addEvenListeners("click", () => {
      console.log("click home");
    });

    this.btnSetting.addEvenListeners("click", () => {
      console.log("click setting");
    });

    this.btnCharacter.addEvenListeners("click", () => {
      console.log("click character");
    });
  }
}

export const header = new Header();
