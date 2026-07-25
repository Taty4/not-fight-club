import { Header } from "../components/header";
import { FIGHTERS_DATABASE } from "../fightersData";

export class CharacterPage {
  canNotChange = JSON.parse(localStorage.getItem("currentBattle-taty4"));

  constructor() {
    this.selectedCharacterKey =
      JSON.parse(localStorage.getItem("currentCharacterKey-taty4")) || "giant";
    this.selectedCharacter = FIGHTERS_DATABASE[this.selectedCharacterKey];
    this.showingCharacterKey = this.selectedCharacterKey;
    this.render();

    this.listener();
  }

  render() {
    this.app = document.querySelector("#app");
    this.header = new Header();

    const pageName = document.createElement("p");
    pageName.className = "page-name";
    pageName.textContent = "Персонаж";

    const wrapperCharactersPage = document.createElement("div");
    wrapperCharactersPage.className = "character-page";

    const conatinerStaticPlayer = document.createElement("div");
    conatinerStaticPlayer.className = "statistic-player";

    const statisticTitle = document.createElement("p");
    statisticTitle.className = "statistic-title";
    statisticTitle.textContent = "Cтатистика:";

    const currentNamePlayer = document.createElement("p");
    currentNamePlayer.textContent = `Имя: ${JSON.parse(localStorage.getItem("username-taty4")) || "Пользователь"}`;

    const statisticUser = JSON.parse(
      localStorage.getItem("statisticUser-taty4"),
    ) ?? {
      win: 0,
      lose: 0,
      draw: 0,
    };

    const countWinEl = document.createElement("p");
    const counWin = statisticUser.win;
    countWinEl.textContent = `Количество побед: ${counWin}`;

    const countLoseEl = document.createElement("p");
    const counLose = statisticUser.lose;
    countLoseEl.textContent = `Количество поражений: ${counLose}`;

    const coutDrawEl = document.createElement("p");
    const counDraw = statisticUser.draw;
    coutDrawEl.textContent = `Оба умерли: ${counDraw}`;

    conatinerStaticPlayer.append(
      statisticTitle,
      currentNamePlayer,
      countWinEl,
      countLoseEl,
      coutDrawEl,
    );

    this.containerCharacters = document.createElement("div");
    this.containerCharacters.className = "conatiner-characters";

    const dataValues = Object.values(FIGHTERS_DATABASE);

    for (let i = 0; i < dataValues.length; i++) {
      const wrapperImage = document.createElement("div");

      wrapperImage.className = "wrapper-character";
      if (dataValues[i].key === this.selectedCharacterKey) {
        wrapperImage.classList.add("choosen");
      }
      wrapperImage.dataset.key = dataValues[i].key;

      const image = document.createElement("img");
      image.src = `${dataValues[i].avatarSrc}`;

      wrapperImage.append(image);
      this.containerCharacters.append(wrapperImage);
    }

    wrapperCharactersPage.append(
      this.containerCharacters,
      this.createDatailsCharacter(),
      conatinerStaticPlayer,
    );

    this.app.append(this.header.element, pageName, wrapperCharactersPage);
  }

  createDatailsCharacter() {
    this.chooseCharacterContainer = document.createElement("div");
    this.chooseCharacterContainer.className = "choose-character-container";

    this.wrapperImgDesc = document.createElement("div");
    this.wrapperImgDesc.className = "wrapper-chose-character-image";
    this.imgDesc = document.createElement("img");
    this.imgDesc.src = this.selectedCharacter.imageSrc;
    this.wrapperImgDesc.append(this.imgDesc);

    this.description = document.createElement("div");
    this.description.className = "right-description";

    this.chooseCharacterContainer.append(this.wrapperImgDesc, this.description);

    this.descriptionTitul = document.createElement("p");
    this.descriptionTitul.textContent = this.selectedCharacter.titul;

    this.descriptionText = document.createElement("p");
    this.descriptionText.textContent = this.selectedCharacter.description;

    this.characteristicsCharacter = document.createElement("div");
    this.characteristicsCharacter.className = "characteristic-conatiner";

    const attack = document.createElement("p");
    attack.textContent = "Зоны атаки: ";
    this.attackValue = document.createElement("span");
    this.attackValue.textContent = this.selectedCharacter.attack;
    attack.append(this.attackValue);

    const defense = document.createElement("p");
    defense.textContent = "Зоны защиты: ";
    this.defenseValue = document.createElement("span");
    this.defenseValue.textContent = this.selectedCharacter.defense;
    defense.append(this.defenseValue);

    const damage = document.createElement("p");
    damage.textContent = "Урон: ";
    this.damageValue = document.createElement("span");
    this.damageValue.textContent = this.selectedCharacter.damage;
    damage.append(this.damageValue);

    const crit = document.createElement("p");
    crit.textContent = "Шанс критического удара: ";
    this.critValue = document.createElement("span");
    this.critValue.textContent = `${this.selectedCharacter.crit}%`;
    crit.append(this.critValue);

    const health = document.createElement("p");
    health.textContent = "Здоровье: ";
    this.healthValue = document.createElement("span");
    this.healthValue.textContent = this.selectedCharacter.health;
    health.append(this.healthValue);

    const containerCanChange = document.createElement("div");
    containerCanChange.className = "accept-character-container";
    this.warning = document.createElement("p");
    this.warning.className = "charcter-warning";
    this.warning.textContent =
      "Нельзя сменить персонажа если бой не закончен. Вернитесь и закончите бой!";

    this.btnSaveCharacter = document.createElement("button");
    this.btnSaveCharacter.className = "btn-save-caharacter";
    this.btnSaveCharacter.textContent = "Текущий";
    this.btnSaveCharacter.disabled = true;

    if (this.canNotChange) {
      this.btnSaveCharacter.style.display = "none";
    } else {
      this.warning.style.display = "none";
    }

    containerCanChange.append(this.warning, this.btnSaveCharacter);

    this.characteristicsCharacter.append(attack, defense, damage, crit, health);

    this.description.append(
      this.descriptionTitul,
      this.descriptionText,
      this.characteristicsCharacter,
      containerCanChange,
    );
    this.chooseCharacterContainer.append(this.wrapperImgDesc, this.description);
    return this.chooseCharacterContainer;
  }

  changeDetailsCharacter(event) {
    const target = event.target.closest(".wrapper-character");

    if (!target) return;

    const listCharacter =
      this.containerCharacters.querySelectorAll(".wrapper-character");

    listCharacter.forEach((character) => {
      character.classList.remove("choosen");
    });
    target.classList.add("choosen");

    this.showingCharacterKey = target.dataset.key;

    if (this.canNotChange) {
      this.btnSaveCharacter.style.display = "none";
      this.warning.style.display = "block";
    } else {
      this.warning.style.display = "none";

      if (this.showingCharacterKey === this.selectedCharacterKey) {
        this.btnSaveCharacter.textContent = "Текущий";
        this.btnSaveCharacter.disabled = true;
      } else {
        this.btnSaveCharacter.textContent = "Выбрать";
        this.btnSaveCharacter.disabled = false;
      }
    }
    this.selectedCharacter = FIGHTERS_DATABASE[this.showingCharacterKey];
    this.imgDesc.src = this.selectedCharacter.imageSrc;
    this.descriptionTitul.textContent = this.selectedCharacter.titul;
    this.descriptionText.textContent = this.selectedCharacter.description;

    this.attackValue.textContent = this.selectedCharacter.attack;
    this.defenseValue.textContent = this.selectedCharacter.defense;
    this.critValue.textContent = `${this.selectedCharacter.crit}%`;
    this.healthValue.textContent = this.selectedCharacter.health;
    this.damageValue.textContent = this.selectedCharacter.damage;
  }

  listener() {
    this.containerCharacters.addEventListener("click", (event) => {
      this.changeDetailsCharacter(event);
    });

    this.btnSaveCharacter.addEventListener("click", () => {
      this.selectedCharacterKey = this.showingCharacterKey;
      this.btnSaveCharacter.textContent = "Текущий";
      this.btnSaveCharacter.disabled = true;
      localStorage.setItem(
        "currentCharacterKey-taty4",
        JSON.stringify(this.selectedCharacter.key),
      );
    });
  }

  destroy() {}
}
