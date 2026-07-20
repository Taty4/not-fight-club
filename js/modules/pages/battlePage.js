import { GroupCheckbox } from "../components/groupCheckbox.js";
import { HealthBar } from "../components/healthBar.js";
import { Game } from "../components/UIGame.js";
import { header } from "../components/header.js";
import { FIGHTERS_DATABASE } from "../fightersData.js";

export class BattlePage {
  constructor() {
    this.setPlayer();
    this.setEnemy();
    this.game = new Game(this.playerConfig, this.enemyConfig);
    this.game.init();
    this.render();
    this.listener();

    this.logic = new BattleLogic();
  }

  listener() {
    this.btnBattle.element.addEventListener("click", () => {
      this.game.start();

      this.resultBattle = this.logic.fight(
        {
          attack: this.groupAttackZones.getSelectedZones(),
          defense: this.groupDefenseZones.getSelectedZones(),
        },
        this.playerConfig,
        this.enemyConfig,
      );

      this.healthBarPlayer.setHealth(
        this.playerConfig.currentHealth,
        this.playerConfig.health,
      );
      this.healthBarEnemy.setHealth(
        this.enemyConfig.currentHealth,
        this.enemyConfig.health,
      );
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

    if (currentEnemy) {
      this.enemyConfig = { ...FIGHTERS_DATABASE[currentEnemy.key] };
      this.enemyConfig.currentHealth = currentEnemy.currentHealth;
    } else {
      this.enemyConfig = { ...FIGHTERS_DATABASE[randomKey] };
    }
  }

  setPlayer() {
    const currentPlayer =
      JSON.parse(localStorage.getItem("currentPlayer-taty4")) || null;

    if (currentPlayer) {
      this.playerConfig = { ...FIGHTERS_DATABASE[currentPlayer.key] };
      this.playerConfig.currentHealth = currentPlayer.currentHealth;
    } else {
      this.playerConfig = { ...FIGHTERS_DATABASE.giant };
    }
  }

  handleGameOver() {
    localStorage.removeItem("currentEnemy-taty4");
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

class BattleLogic {
  zones = ["head", "leg", "body", "neck", "arm", "stomach"];
  constructor() {}

  fight(playerZones, playerConfig, enemyConfig) {
    this.enemy = enemyConfig;
    this.player = playerConfig;
    this.playerZones = playerZones;
    this.enemyZones = this.getRandomEnemyZones();
    return this.getResult();
  }

  getRandomEnemyZones() {
    const min = 0;
    const max = this.zones.length - 1;
    const countAttack = this.enemy.attack;
    const countDefense = this.enemy.defense;

    const uniqueZonesAttack = new Set();
    const uniqueZonesDefense = new Set();

    while (uniqueZonesAttack.size < countAttack) {
      const randomInd = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueZonesAttack.add(this.zones[randomInd]);
    }

    while (uniqueZonesDefense.size < countDefense) {
      const randomInd = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueZonesDefense.add(this.zones[randomInd]);
    }

    return {
      attack: Array.from(uniqueZonesAttack),
      defense: Array.from(uniqueZonesDefense),
    };
  }

  calculateHits(attacker, defender, attackerZones, defenderZones, result) {
    const damage = 15;

    attackerZones.attack.forEach((zone) => {
      const isBlocked = defenderZones.defense.includes(zone);
      const actualDamage = isBlocked ? 0 : damage;

      // 1. Записываем хит в массив (исправлено на defender)
      result.push({
        attacker: attacker.name,
        defender: defender.name,
        zone: zone,
        blocked: isBlocked,
        damage: actualDamage,
      });

      // 2. Наносим урон, если удар не заблокирован
      if (!isBlocked) {
        defender.currentHealth = Math.max(
          0,
          defender.currentHealth - actualDamage,
        );
      }
    });
  }

  getResult() {
    const result = [];

    // Обрабатываем атаку игрока на врага
    this.calculateHits(
      this.player,
      this.enemy,
      this.playerZones,
      this.enemyZones,
      result,
    );

    // Обрабатываем атаку врага на игрока
    this.calculateHits(
      this.enemy,
      this.player,
      this.enemyZones,
      this.playerZones,
      result,
    );

    this.saveState();

    return result;
  }

  saveState() {
    // Сохраняем игрока (только ключевые данные)
    if (this.playerConfig) {
      const playerSave = {
        key: this.playerConfig.key,
        currentHealth: this.playerConfig.currentHealth,
      };
      localStorage.setItem("currentPlayer-taty4", JSON.stringify(playerSave));
    }

    // Сохраняем врага (только ключевые данные)
    if (this.enemyConfig) {
      const enemySave = {
        key: this.enemyConfig.key,
        currentHealth: this.enemyConfig.currentHealth,
      };
      localStorage.setItem("currentEnemy-taty4", JSON.stringify(enemySave));
    }
  }
}
