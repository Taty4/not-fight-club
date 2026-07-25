import { GroupCheckbox } from "../components/groupCheckbox.js";
import { HealthBar } from "../components/healthBar.js";
import { Game } from "../components/UIGame.js";
import { Header } from "../components/header.js";
import { FIGHTERS_DATABASE } from "../fightersData.js";
import { ModalGameOver } from "../components/modalGameOver.js";
import arena from "../../assets/images/scene.webp";
import { zones } from "../zonesData.js";

export class BattlePage {
  #delayID = null;
  currentBattle;
  statisticPlayer = JSON.parse(localStorage.getItem("statisticUser-taty4")) || {
    win: 0,
    lose: 0,
    draw: 0,
  };

  constructor() {
    this.zones = zones;
    this.zonesKey = Object.keys(this.zones);
    this.setBattle();
    this.saveStatistik();
    this.render();
    this.game = new Game(
      this.canvas,
      this.ctx,
      this.playerConfig,
      this.enemyConfig,
      () => this.setHealth(),
      () => this.updateButton(),
      (looser) => this.modal.showModal(looser),
    );
    this.game.init();

    this.listener();

    this.setHealth();
    this.logic = new BattleLogic(this.zonesKey);
  }

  listener() {
    this.btnBattle.element.addEventListener("click", () => {
      if (
        this.playerConfig.currentHealth <= 0 ||
        this.enemyConfig.currentHealth <= 0
      ) {
        return;
      }
      this.game.start();

      this.resultBattle = this.logic.fight(
        {
          attack: this.groupAttackZones.getSelectedZones(),
          defense: this.groupDefenseZones.getSelectedZones(),
        },
        this.playerConfig,
        this.enemyConfig,
      );

      this.btnBattle.element.disabled = true;

      this.saveState();
      this.checkWinner();
      this.writeLogs(this.currentBattle.log);
    });
  }

  setHealth() {
    this.healthBarPlayer.setHealth(
      this.playerConfig.currentHealth,
      this.playerConfig.health,
    );
    this.healthBarEnemy.setHealth(
      this.enemyConfig.currentHealth,
      this.enemyConfig.health,
    );
  }

  writeLogs() {
    const logs = this.currentBattle.log;

    if (!logs || logs.length === 0) return;
    this.battleLogContainer.innerHTML = "";
    this.battleLogContainer.style.display = "block";

    logs.forEach((log, index) => {
      const p = document.createElement("p");
      p.className = "battle-log-txt";
      if (typeof log === "string") {
        p.classList.add("txt-raund");
        p.innerHTML = `${log}`;
      } else {
        const isPlayerAttack = log.roleAttack === "player";
        const attackerClass = isPlayerAttack ? "player" : "enemy";
        const defenderClass = isPlayerAttack ? "enemy" : "player";
        const baseText = `<span class='${attackerClass}'>${log.attacker}</span> ударил <span class='${defenderClass}'>${log.defender}</span> <span class='zone'>${this.zones[log.zone].attackLog}</span>`;

        let outcomeText = "";
        if (log.crit) {
          if (log.blocked) {
            outcomeText = `, пробил защиту критическим ударом! Урон - <span class='damage'>${log.damage}</span>.`;
          } else {
            outcomeText = `. Нанесен сокрушительный критический удар! Повышенный урон - <span class='damage'>${log.damage}</span>.`;
          }
        } else {
          if (log.blocked) {
            outcomeText = `, но <span class='${defenderClass}'>${log.defender}</span> заблокировал удар. Урон - <span class='damage'>${log.damage}</span>.`;
          } else {
            outcomeText = `. <span class='${defenderClass}'>${log.defender}</span> не успел заблокировать удар. Урон - <span class='damage'>${log.damage}</span>.`;
          }
        }
        p.innerHTML = baseText + outcomeText;
      }

      this.battleLogContainer.append(p);
      this.battleLogContainer.scrollTo({
        top: this.battleLogContainer.scrollHeight,
        behavior: "smooth",
      });
    });
  }

  clearLogs() {
    this.battleLogContainer.innerHTML = "";
    this.battleLogContainer.style.display = "none";
  }

  render() {
    this.app = document.querySelector("#app");
    this.header = new Header();

    this.groupAttackZones = new GroupCheckbox(
      "attack",
      this.zones,
      this.playerConfig,
      () => this.updateButton(),
    );
    this.groupDefenseZones = new GroupCheckbox(
      "defense",
      this.zones,
      this.playerConfig,
      () => this.updateButton(),
    );

    this.btnBattle = new BtnBattle();
    this.healthBarPlayer = new HealthBar("player", this.playerConfig);
    this.healthBarEnemy = new HealthBar("enemy", this.enemyConfig);
    this.modal = new ModalGameOver(() => this.startNewBattle());

    const containerBars = document.createElement("div");
    containerBars.className = "container-bars";
    containerBars.append(
      this.healthBarPlayer.element,
      this.healthBarEnemy.element,
    );

    this.wrapperCanvas = document.createElement("div");
    this.wrapperCanvas.className = "wrapper-canvas";

    const containerGame = document.createElement("div");
    containerGame.className = "wrapper-game";

    this.canvas = document.createElement("canvas");
    this.canvas.width = 800;
    this.canvas.height = 350;
    this.canvas.className = "canvas";
    this.ctx = this.canvas.getContext("2d");

    this.battleLogContainer = document.createElement("div");
    this.battleLogContainer.className = "batle-log-container";
    this.battleLogContainer.style.display = "none";

    this.writeLogs();

    this.wrapperCanvas.append(this.canvas, this.btnBattle.element);

    containerGame.append(
      this.groupDefenseZones.element,
      this.wrapperCanvas,
      this.groupAttackZones.element,
    );

    this.app.append(
      this.modal.element,
      this.header.element,
      containerBars,
      containerGame,
      this.battleLogContainer,
    );
  }

  startNewBattle() {
    this.setBattle();
    this.setHealth();
    this.healthBarEnemy.changeCharacter(this.enemyConfig);
    this.destroy();
    this.game = new Game(
      this.canvas,
      this.ctx,
      this.playerConfig,
      this.enemyConfig,
      () => this.setHealth(),
      () => this.updateButton(),
      (looser) => this.modal.showModal(looser),
    );
    this.modal.hideModal();
    this.game.init();
    this.clearLogs();
    this.updateButton();
  }

  setBattle() {
    const currentBattle = JSON.parse(
      localStorage.getItem("currentBattle-taty4"),
    );
    if (currentBattle) {
      const savedPlayer = currentBattle.player;
      const savedEnemy = currentBattle.enemy;

      this.playerConfig = { ...FIGHTERS_DATABASE[savedPlayer.key] };
      this.playerConfig.currentHealth = savedPlayer.currentHealth;

      this.enemyConfig = { ...FIGHTERS_DATABASE[savedEnemy.key] };
      this.enemyConfig.currentHealth = savedEnemy.currentHealth;

      this.currentBattle = currentBattle;
    } else {
      this.setCurrentPlayer();
      this.setRandomEnemy();
      this.currentBattle = {
        player: {
          key: this.playerConfig.key,
          currentHealth: this.playerConfig.currentHealth,
        },
        enemy: {
          key: this.enemyConfig.key,
          currentHealth: this.enemyConfig.currentHealth,
        },
        log: [],
      };
    }
  }

  setRandomEnemy() {
    const keys = Object.keys(FIGHTERS_DATABASE);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    this.enemyConfig = { ...FIGHTERS_DATABASE[randomKey] };
  }

  setCurrentPlayer() {
    const currentCharacter =
      JSON.parse(localStorage.getItem("currentCharacterKey-taty4")) || null;

    if (currentCharacter) {
      this.playerConfig = { ...FIGHTERS_DATABASE[currentCharacter] };
    } else {
      this.playerConfig = { ...FIGHTERS_DATABASE.giant };
    }
  }

  handleGameOver(loser) {
    localStorage.removeItem("currentBattle-taty4");
    this.game.setBattleOutcome(loser);
  }

  checkWinner() {
    let loser;
    if (
      this.playerConfig.currentHealth === 0 &&
      this.enemyConfig.currentHealth !== 0
    ) {
      loser = "player";
      this.statisticPlayer.lose += 1;
    } else if (
      this.enemyConfig.currentHealth === 0 &&
      this.playerConfig.currentHealth !== 0
    ) {
      loser = "enemy";
      this.statisticPlayer.win += 1;
    } else if (
      this.playerConfig.currentHealth === 0 &&
      this.enemyConfig.currentHealth === 0
    ) {
      loser = "none";
      this.statisticPlayer.draw += 1;
    }

    if (loser) {
      this.handleGameOver(loser);
      this.saveStatistik();
    }
  }

  saveState() {
    this.currentBattle.player.key = this.playerConfig.key;
    this.currentBattle.enemy.key = this.enemyConfig.key;
    this.currentBattle.log.push("Бой!", ...this.resultBattle);
    this.currentBattle.player.currentHealth = this.playerConfig.currentHealth;
    this.currentBattle.enemy.currentHealth = this.enemyConfig.currentHealth;
    localStorage.setItem(
      "currentBattle-taty4",
      JSON.stringify(this.currentBattle),
    );
  }

  saveStatistik() {
    localStorage.setItem(
      "statisticUser-taty4",
      JSON.stringify(this.statisticPlayer),
    );
  }

  updateButton() {
    const enabled =
      this.groupAttackZones.isValid && this.groupDefenseZones.isValid;
    this.btnBattle.element.disabled = !enabled;
  }

  destroy() {
    this.game.cancelAnimation();
    clearTimeout(this.#delayID);
  }
}

class BtnBattle {
  element;
  constructor() {
    this.element = document.createElement("button");
    this.element.className = "btn-fight";
    this.element.textContent = "Бой!";
    this.element.disabled = true;
  }
}

class BattleLogic {
  s;
  constructor(zones) {
    this.zones = zones;
  }

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
    const damagePerHit = attacker.damage;
    let totalDamageDealt = 0;

    const playerUsername =
      JSON.parse(localStorage.getItem("username-taty4")) || "Пользователь";
    let attackerName;
    let defenderName;
    let role;

    if (attacker === this.player) {
      attackerName = playerUsername;
      defenderName = this.enemy.name;
      role = "player";
    } else {
      attackerName = this.enemy.name;
      defenderName = playerUsername;
      role = "enemy";
    }

    attackerZones.attack.forEach((zone) => {
      const isCrit = Math.random() * 100 < attacker.crit;

      const isBlocked = defenderZones.defense.includes(zone);
      let actualDamage = isBlocked ? 0 : damagePerHit;

      if (isCrit && !isBlocked) {
        actualDamage = damagePerHit * 1.5;
      }
      if (isCrit && isBlocked) {
        actualDamage = damagePerHit;
      }
      if (!isCrit && isBlocked) {
        actualDamage = 0;
      }
      if (!isCrit && !isBlocked) {
        actualDamage = damagePerHit;
      }

      totalDamageDealt += actualDamage;

      result.push({
        attacker: attackerName,
        defender: defenderName,
        zone: zone,
        blocked: isBlocked,
        crit: isCrit,
        damage: actualDamage,
        roleAttack: role,
      });
    });

    return totalDamageDealt;
  }

  getResult() {
    const result = [];

    const damageToEnemy = this.calculateHits(
      this.player,
      this.enemy,
      this.playerZones,
      this.enemyZones,
      result,
    );

    const damageToPlayer = this.calculateHits(
      this.enemy,
      this.player,
      this.enemyZones,
      this.playerZones,
      result,
    );

    this.player.currentHealth = Math.max(
      0,
      this.player.currentHealth - damageToPlayer,
    );
    this.enemy.currentHealth = Math.max(
      0,
      this.enemy.currentHealth - damageToEnemy,
    );

    return result;
  }
}
