import { Header } from "../components/header";
import { FIGHTERS_DATABASE } from "../fightersData";

export class CharacterPage {
  constructor() {
    this.render();
    this.listener();
  }

  render() {
    this.app = document.querySelector("#app");
    this.header = new Header("character", () => this.destroy());

    this.containerCharacters = document.createElement("div");
    this.containerCharacters.className = "conatiner-characters";

    const dataValues = Object.values(FIGHTERS_DATABASE);

    for (let i = 0; i < dataValues.length; i++) {
      const wrapperImage = document.createElement("div");
      wrapperImage.className = "wrapper-character";
      wrapperImage.dataset.key = dataValues[i].key;

      const image = document.createElement("img");
      image.src = `${dataValues[i].imageSrc}`;

      wrapperImage.append(image);
      this.containerCharacters.append(wrapperImage);
    }
    this.app.append(this.header.element, this.containerCharacters);
  }

  listener() {
    this.containerCharacters.addEventListener("click", (event) => {
      const target = event.target.closest(".wrapper-character");
      console.log(target);

      if (!target) return;

      const playerSave = {
        key: target.dataset.key,
        currentHealth: FIGHTERS_DATABASE[target.dataset.key].health,
      };
      localStorage.setItem("currentPlayer-taty4", JSON.stringify(playerSave));
    });
  }

  destroy() {}
}
