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
    this.name.textContent = `${this.player.name}`;

    this.progressBar = document.createElement("div");
    this.progressBar.className = `progress-bar`;

    this.avatar = document.createElement("img");
    this.avatar.src = this.player.avatarSrc;
    this.avatar.className = "avatar";

    this.element.append(this.name, this.progressBar, this.avatar);
  }

  setHealth(currentHP, maxHP) {
    const percent = Math.round((currentHP / maxHP) * 100);
    console.log(percent);
    this.progressBar.style.width = `${percent}%`;
  }
}
