import arena from "../../assets/images/scene.webp";
import sounds from "../audioManager";

class Fighter {
  #startPosition;
  battleOutcome = null;

  constructor(options) {
    this.key = options.key;
    this.sounds = options.sounds;
    this.sprites = options.sprites;

    this.spriteRun = this.sprites.run.image;
    this.spriteIdle = this.sprites.idle.image;
    this.spriteAttack = this.sprites.attack.image;
    this.spriteDying = this.sprites.dying.image;
    this.spriteHurt = this.sprites.hurt.image;

    this.step = 0;
    this.widthSprite = options.widthSprite;
    this.heightSprite = options.heightSprite;

    this.currentSprite = this.spriteIdle;
    this.currentCountFrames = this.sprites.idle.countFrames;
    this.currentCountColumns = this.sprites.idle.countColumns;

    this.currentState = "idle";
    this.direction = options.direction || "right";
    this.#startPosition = options.startPosition;
    this.dx = options.startPosition;
    this.sx = 0;
    this.sy = 0;
    this.dy = 95;
    this.isFlipped = options.direction === "left";

    this.currentFrame = 0;
    this.timer = 0;
    this.isBusy = false;
  }

  #changeState(stateName, step, spriteImage, config) {
    if (this.currentState === stateName) return;

    this.currentState = stateName;
    this.currentSprite = spriteImage;
    this.currentCountFrames = config.countFrames;
    this.currentCountColumns = config.countColumns;
    this.step = step;

    this.currentFrame = 0;
    this.timer = 0;
    this.sx = 0;
    this.sy = 0;
  }

  idle() {
    this.#changeState("idle", 0, this.spriteIdle, this.sprites.idle);
    this.isFlipped = this.direction === "left";
  }

  move() {
    const step = this.direction === "right" ? 240 : -240;
    sounds.playSFX("run");
    this.#changeState("run", step, this.spriteRun, this.sprites.run);
    this.isFlipped = this.direction === "left";
    this.isBusy = true;
  }

  attack() {
    const myHitSounds = `${this.key}_hit`;
    sounds.playSFX(myHitSounds);
    this.#changeState("attack", 0, this.spriteAttack, this.sprites.attack);
  }

  hurt() {
    const myHurtSounds = `${this.key}_hurt`;
    sounds.playSFX(myHurtSounds);
    this.#changeState("hurt", 0, this.spriteHurt, this.sprites.hurt);
  }

  dying() {
    this.#changeState("daying", 0, this.spriteDying, this.sprites.dying);
  }

  moveBack() {
    const step = this.direction === "right" ? -240 : 240;
    sounds.playSFX("run");
    this.#changeState("run_back", step, this.spriteRun, this.sprites.run);
    this.isFlipped = this.direction === "right";
  }

  gameOver(callback) {
    callback();
  }

  update(dt) {
    this.dx += this.step * dt;

    this.timer += dt;

    const frameDuration = 0.05;

    if (this.timer >= frameDuration) {
      this.currentFrame++;

      this.timer -= frameDuration;

      if (this.currentFrame >= this.currentCountFrames) {
        if (this.currentState === "run") {
          sounds.stopSFX("run");
          if (this.battleOutcome === "lose") {
            this.hurt();
          } else {
            this.attack();
          }
        } else if (this.currentState === "hurt") {
          this.dying();
          this.isBusy = false;
        } else if (this.currentState === "attack") {
          if (this.battleOutcome === "mutualLose") {
            this.hurt();
          } else {
            this.moveBack();
          }
        } else if (this.currentState === "run_back") {
          sounds.stopSFX("run");
          this.dx = this.#startPosition;
          this.idle();
          this.isBusy = false;
        }

        this.currentFrame = 0;
      }

      this.sx =
        (this.currentFrame % this.currentCountColumns) * this.widthSprite;
      this.sy =
        Math.floor(this.currentFrame / this.currentCountColumns) *
        this.heightSprite;
    }
  }

  getOptions() {
    return {
      sprite: this.currentSprite,
      sx: this.sx,
      sy: this.sy,
      spriteWidth: this.widthSprite,
      spriteHeight: this.heightSprite,
      dx: this.dx,
      dy: this.dy,
      width: this.widthSprite * 0.7,
      height: this.widthSprite * 0.6,
    };
  }
}

export class Game {
  #animationID = null;
  #lastTime = 0;
  isTimeToUpdateHealth = false;
  isTimeToUpdateButton = false;
  isGameOver = false;

  constructor(
    canvas,
    ctx,
    playerConfig,
    enemyConfig,
    updateHealth,
    updateButton,
    showModal,
  ) {
    this.updateHealth = updateHealth;
    this.updateButton = updateButton;
    this.showModal = showModal;
    this.isGameOver = false;
    this.canvas = canvas;
    this.canvas.width = 800;
    this.canvas.height = 350;
    this.canvas.className = "canvas";

    this.ctx = ctx;

    this.background = new Image();
    this.background.onload = () => this.draw();
    this.background.src = arena;

    this.player = new Fighter({
      ...playerConfig,
      startPosition: 50,
      direction: "right",
    });

    this.enemy = new Fighter({
      ...enemyConfig,
      startPosition: 456,
      direction: "left",
    });
  }

  init() {
    this.player.update(0);
    this.enemy.update(0);
    this.draw();

    this.startLoop();
  }

  startLoop() {
    if (this.#animationID !== null) {
      this.cancelAnimation();
    }

    this.#lastTime = performance.now();

    const render = (timestamp) => {
      let dt = (timestamp - this.#lastTime) / 1000;

      if (dt > 0.1) dt = 0.1;

      this.#lastTime = timestamp;

      this.player.update(dt);
      this.enemy.update(dt);

      this.draw();

      if (this.isTimeToUpdateHealth) {
        if (
          this.player.currentState === "attack" ||
          this.enemy.currentState === "attack" ||
          this.player.currentState === "hurt" ||
          this.enemy.currentState === "hurt"
        ) {
          this.updateHealth();
          this.isTimeToUpdateHealth = false;
        }
      }

      if (this.isTimeToUpdateButton) {
        if (!this.player.isBusy && !this.enemy.isBusy) {
          this.updateButton();
          this.isTimeToUpdateButton = false;
        }
      }

      if (this.isGameOver) {
        if (!this.player.isBusy && !this.enemy.isBusy) {
          this.showModal(this.looser);
          this.isGameOver = false;
        }
      }

      this.#animationID = requestAnimationFrame(render);
    };

    this.#animationID = requestAnimationFrame(render);
  }

  start() {
    if (this.player.isBusy || this.enemy.isBusy) return;
    this.isTimeToUpdateHealth = true;
    this.isTimeToUpdateButton = true;
    this.player.move();
    this.enemy.move();
  }

  setBattleOutcome(looser) {
    this.looser = looser;

    this.isGameOver = true;
    if (looser === "player") {
      this.player.battleOutcome = "lose";
    } else if (looser === "enemy") {
      this.enemy.battleOutcome = "lose";
    } else {
      this.player.battleOutcome = "mutualLose";
      this.enemy.battleOutcome = "mutualLose";
    }
  }

  cancelAnimation() {
    if (this.#animationID !== null) {
      cancelAnimationFrame(this.#animationID);
      this.#animationID = null;
      this.player.isBusy = false;
      this.enemy.isBusy = false;
    }
  }

  draw() {
    if (!this.background.complete) return;

    const playerOptions = this.player.getOptions();
    const enemyOptions = this.enemy.getOptions();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(this.background, -100, 0, 1000, 350);

    this.ctx.save();
    if (this.player.isFlipped) {
      this.ctx.translate(
        playerOptions.dx + playerOptions.width / 2,
        playerOptions.dy + playerOptions.height / 2,
      );
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        playerOptions.sprite,
        playerOptions.sx,
        playerOptions.sy,
        playerOptions.spriteWidth,
        playerOptions.spriteHeight,
        -playerOptions.width / 2,
        -playerOptions.height / 2,
        playerOptions.width,
        playerOptions.height,
      );
    } else {
      this.ctx.drawImage(
        playerOptions.sprite,
        playerOptions.sx,
        playerOptions.sy,
        playerOptions.spriteWidth,
        playerOptions.spriteHeight,
        playerOptions.dx,
        playerOptions.dy,
        playerOptions.width,
        playerOptions.height,
      );
    }
    this.ctx.restore();

    this.ctx.save();
    if (this.enemy.isFlipped) {
      this.ctx.translate(
        enemyOptions.dx + enemyOptions.width / 2,
        enemyOptions.dy + enemyOptions.height / 2,
      );
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        enemyOptions.sprite,
        enemyOptions.sx,
        enemyOptions.sy,
        enemyOptions.spriteWidth,
        enemyOptions.spriteHeight,
        -enemyOptions.width / 2,
        -enemyOptions.height / 2,
        enemyOptions.width,
        enemyOptions.height,
      );
    } else {
      this.ctx.drawImage(
        enemyOptions.sprite,
        enemyOptions.sx,
        enemyOptions.sy,
        enemyOptions.spriteWidth,
        enemyOptions.spriteHeight,
        enemyOptions.dx,
        enemyOptions.dy,
        enemyOptions.width,
        enemyOptions.height,
      );
    }
    this.ctx.restore();
  }
}
