export class HealthBar {
  element;
  constructor(typePlayer, config) {
    this.type = typePlayer;
    this.player = config;
    this.create();
    this.setHealth(this.player.health, this.player.currentHealth);
  }

  create() {
    this.element = document.createElement("div");
    this.element.className = `health-${this.type}`;

    this.name = document.createElement("p");
    this.name.className = `${this.type}-name battle-name`;

    if (this.type === "player") {
      const username = JSON.parse(localStorage.getItem("username-taty4"));
      this.name.textContent = username ?? "Вы";
    } else {
      this.name.textContent = `${this.player.name}`;
    }

    this.progressBar = document.createElement("div");
    this.progressBar.className = `progress-bar progress-bar-${this.type}`;

    this.progressTxt = document.createElement("p");
    this.progressTxt.className = "progres-bar-txt";

    this.avatar = document.createElement("img");
    this.avatar.src = this.player.avatarSrc;
    this.avatar.className = `avatar avatar-${this.type}`;

    this.progressBar.append(this.progressTxt);
    this.element.append(this.name, this.progressBar, this.avatar);
  }

  setHealth(currentHP, maxHP) {
    this.progressTxt.textContent = `${currentHP}/${maxHP}`;
    const percent = Math.round((currentHP / maxHP) * 100);
    this.progressBar.style.width = `${percent}%`;
  }

  changeCharacter(config) {
    this.player = config;

    this.name.textContent = `${this.player.name}`;
    this.avatar.src = this.player.avatarSrc;
  }
}
