import { FIGHTERS_DATABASE } from "./fightersData.js";

class Fighter {
  #startPosition;

  constructor(options) {
    this.sprites = options.sprites;

    this.spriteRun = this.sprites.run.image;
    this.spriteIdle = this.sprites.idle.image;
    this.spriteAttack = this.sprites.attack.image;

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
    const step = this.direction === "right" ? 10 : -10;
    this.#changeState("run", step, this.spriteRun, this.sprites.run);
    this.isFlipped = this.direction === "left";
    this.isBusy = true;
  }

  attack() {
    this.#changeState("attack", 0, this.spriteAttack, this.sprites.attack);
  }

  moveBack() {
    const step = this.direction === "right" ? -10 : 10;
    this.#changeState("run_back", step, this.spriteRun, this.sprites.run);

    this.isFlipped = this.direction === "right";
  }

  update() {
    this.timer++;

    if (this.timer >= 3) {
      this.currentFrame++;

      this.timer = 0;

      if (this.currentFrame >= this.currentCountFrames) {
        if (this.currentState === "run") {
          this.attack();
        } else if (this.currentState === "attack") {
          this.moveBack();
        } else if (this.currentState === "run_back") {
          this.dx = this.#startPosition; // Только ТЕПЕРЬ, когда он добежал, выравниваем позицию
          this.idle(); // Встаем в стойку
          this.isBusy = false;
        }

        this.currentFrame = 0;
      }

      this.sx =
        (this.currentFrame % this.currentCountColumns) * this.widthSprite;
      this.sy =
        Math.floor(this.currentFrame / this.currentCountColumns) *
        this.heightSprite;
      this.dx += this.step;
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
  constructor(playerConfig, enemyConfig) {
    this.element = document.createElement("canvas");
    this.element.width = 800;
    this.element.height = 350;
    this.element.className = "canvas";

    this.ctx = this.element.getContext("2d");

    this.background = new Image();
    this.background.src = "./assets/images/scene.webp";
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
    this.player.update();
    this.enemy.update();

    this.draw();

    requestAnimationFrame(() => this.init());
  }

  start() {
    if (this.player.isBusy || this.enemy.isBusy) return;
    this.player.move();
    this.enemy.move();
    console.log(this.player, this.enemy);
  }

  draw() {
    const playerOptions = this.player.getOptions();
    const enemyOptions = this.enemy.getOptions();

    this.ctx.clearRect(0, 0, this.element.width, this.element.height);

    this.ctx.save();

    this.ctx.drawImage(this.background, -100, 0, 1000, 350);

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
