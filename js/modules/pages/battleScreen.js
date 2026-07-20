import { GroupCheckbox } from "../components/groupCheckbox.js";
import { HealthBar } from "../components/healthBar.js";
import { Game } from "../UIGame.js";
import { header } from "../components/header.js";
import { FIGHTERS_DATABASE } from "../fightersData.js";

export class BattleScreen {
  constructor() {
    this.setPlayer();
    this.setEnemy();
    this.game = new Game(this.playerConfig, this.enemyConfig);
    this.game.init();
    this.render();
    this.listener();
  }

  listener() {
    this.btnBattle.element.addEventListener("click", () => {
      console.log(
        this.groupAttackZones.getSelectedZones(),
        this.groupDefenseZones.getSelectedZones(),
      );
      this.game.start();
      this.healthBarPlayer.setHealth(70, this.playerConfig.health);
      this.healthBarEnemy.setHealth(50, this.enemyConfig.health);
    });
  }

  render() {
    this.app = document.querySelector("#app");
    this.header = header;
    header.create();

    this.groupAttackZones = new GroupCheckbox("attack", () =>
      this.updateButton(),
    );
    this.groupDefenseZones = new GroupCheckbox("defense", () =>
      this.updateButton(),
    );
    this.btnBattle = new BtnBattle();

    this.healthBarPlayer = new HealthBar("player", this.playerConfig);
    this.healthBarEnemy = new HealthBar("enemy", this.enemyConfig);

    const wrapperCanvas = document.createElement("div");
    wrapperCanvas.className = "wrapper-canvas";

    const containerGame = document.createElement("div");
    containerGame.className = "wrapper-game";

    wrapperCanvas.append(
      this.game.element,
      this.btnBattle.element,
      this.healthBarEnemy.element,
      this.healthBarPlayer.element,
    );

    containerGame.append(
      this.groupDefenseZones.element,
      wrapperCanvas,
      this.groupAttackZones.element,
    );

    this.app.append(this.header.element, containerGame);
  }

  setEnemy() {
    const currentEnemy =
      JSON.parse(localStorage.getItem("currentEnemy-taty4")) || null;

    const keys = Object.keys(FIGHTERS_DATABASE);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    this.enemyConfig = currentEnemy
      ? currentEnemy
      : FIGHTERS_DATABASE[randomKey];
  }

  setPlayer() {
    const currentPlayer =
      JSON.parse(localStorage.getItem("currentPlayer-taty4")) || null;

    this.playerConfig = currentPlayer ? currentPlayer : FIGHTERS_DATABASE.giant;
  }

  updateButton() {
    const enabled =
      this.groupAttackZones.isValid && this.groupDefenseZones.isValid;
    this.btnBattle.element.disabled = !enabled;
  }
}

class BtnBattle {
  element;
  constructor() {
    this.element = document.createElement("button");
    this.element.className = "btn-fight";
    this.element.textContent = "Fight!";
    this.element.disabled = true;
  }
}
