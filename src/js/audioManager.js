import { FIGHTERS_DATABASE } from "./fightersData";

export class audioManager {
  constructor() {
    this.enabledSounds = JSON.parse(localStorage.getItem("sounds-taty4")) || {
      bgm: false,
      action: false,
    };
    this.bgm = null;
    this.isMusicPlaying = false;
    this.sfx = {};
  }

  mute(typeSounds) {
    if (typeSounds === "action") {
      this.enabledSounds.action = true;
    } else {
      this.bgm.pause();
      this.enabledSounds.bgm = true;
      this.isMusicPlaying = false;
    }
    this.saveSoundsSetting();
  }

  unmute(typeSounds) {
    if (typeSounds === "action") {
      this.enabledSounds.action = false;
    } else {
      this.enabledSounds.bgm = false;
      this.playBgmMusic();
    }
    this.saveSoundsSetting();
  }

  saveSoundsSetting() {
    localStorage.setItem("sounds-taty4", JSON.stringify(this.enabledSounds));
  }

  loadSFX(name, src) {
    const audio = new Audio(src);
    audio.preload = "auto";
    this.sfx[name] = audio;
  }

  preloadCharacterSounds() {
    for (const [key, data] of Object.entries(FIGHTERS_DATABASE)) {
      const soundsCharacter = data.sounds;
      for (const [name, src] of Object.entries(soundsCharacter)) {
        const soundName = `${key}_${name}`;
        console.log(soundName, typeof src);
        this.loadSFX(soundName, src);
      }
    }
    console.log(this.sfx);
  }

  playSFX(name) {
    if (this.enabledSounds.action) return;
    const sound = this.sfx[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch((err) => console.log(`Ошибка эффекта ${name}:`, err));
    }
  }

  stopSFX(name) {
    const sound = this.sfx[name];
    if (sound) {
      sound.pause();
    }
  }

  initBgmMusic(src) {
    this.bgm = new Audio(src);
    this.bgm.loop = true;
    this.bgm.volume = 0.3;
  }

  playBgmMusic() {
    if (this.enabledSounds.bgm) return;
    if (this.bgm && !this.isMusicPlaying) {
      this.bgm
        .play()
        .then(() => {
          this.isMusicPlaying = true;
          console.log("Музыка успешно запущена!");
        })
        .catch((err) => console.log("Браузер всё ещё блокирует звук:", err));
    }
  }

  initAutoPlay() {
    const isUserRegistered = localStorage.getItem("username-taty4");
    if (isUserRegistered) {
      const handleFirstClick = () => {
        this.playBgmMusic();
        document.removeEventListener("click", handleFirstClick);
      };
      document.addEventListener("click", handleFirstClick);
    }
  }
}

const sounds = new audioManager();
sounds.initBgmMusic("../src/assets/audio/back-full.mp3");
sounds.loadSFX("run", "../src/assets/audio/run.mp3");
sounds.preloadCharacterSounds();
sounds.initAutoPlay();
export default sounds;
