import { Header } from "../components/header.js";
import sounds from "../audioManager.js";

export class SettingPage {
  constructor() {
    this.enabledSounds = JSON.parse(localStorage.getItem("sounds-taty4")) || {
      bgm: false,
      action: false,
    };
    this.render();
    this.listeners();
  }

  render() {
    this.app = document.querySelector("#app");
    this.currentName = JSON.parse(localStorage.getItem("username-taty4"));

    this.header = new Header();

    const namePage = document.createElement("p");
    namePage.className = "page-name";
    namePage.textContent = "Настройки";

    this.settingContainer = document.createElement("div");
    this.settingContainer.className = "setting-page-container";

    this.containerChangeName = document.createElement("div");
    this.containerChangeName.className = "setting-container-name";

    this.divChangeName = document.createElement("div");
    this.divChangeName.className = "div-change-name";

    this.currentNameEl = document.createElement("p");
    this.currentNameEl.className = "setting-username";
    this.currentNameEl.textContent = this.currentName;

    this.btnChangeName = document.createElement("button");
    this.btnChangeName.className = "btn-change-name";
    this.btnChangeName.textContent = "Изменить имя";

    this.divChangeName.append(this.currentNameEl, this.btnChangeName);

    this.formChangeName = document.createElement("form");
    this.formChangeName.className = "form-change-name hidden";

    this.inputChangeName = document.createElement("input");
    this.inputChangeName.className = "input-change-name";
    this.inputChangeName.type = "text";
    this.inputChangeName.value = this.currentName;

    this.btnSaveName = document.createElement("button");
    this.btnSaveName.className = "btn-save-name";
    this.btnSaveName.textContent = "Сохранить имя";

    this.warning = document.createElement("span");
    this.warning.className = "warnig-name hidden";
    this.warning.textContent = "Введите имя длинее 2-ух символов";

    this.formChangeName.append(
      this.inputChangeName,
      this.warning,
      this.btnSaveName,
    );
    this.containerChangeName.append(this.divChangeName, this.formChangeName);

    this.containerChandeSounds = document.createElement("div");
    this.containerChandeSounds.className = "setting-container-sounds";

    const soundsTitleEl = document.createElement("p");
    soundsTitleEl.className = "setting-sounds-title";
    soundsTitleEl.textContent = "Управление аудио";

    const managerBgm = document.createElement("div");
    managerBgm.className = "item-sounds-setting";

    const bgmTxtEl = document.createElement("p");
    bgmTxtEl.className = "txt-sounds-control";
    bgmTxtEl.textContent = "Фоновая музыка";

    this.inputEnableBgm = document.createElement("input");
    this.inputEnableBgm.type = "checkbox";
    this.inputEnableBgm.dataset.sound = "bgm";
    this.inputEnableBgm.name = "sound-control";
    this.inputEnableBgm.checked = !this.enabledSounds.bgm;

    this.labelBgm = document.createElement("label");
    this.labelBgm.className = "label-setting";

    this.labelBgm.append(bgmTxtEl, this.inputEnableBgm);
    managerBgm.append(this.labelBgm);

    const managerActionSounds = document.createElement("div");
    managerActionSounds.className = "item-sounds-setting";

    const actionSoundsTxtEl = document.createElement("p");
    actionSoundsTxtEl.className = "txt-sounds-control";
    actionSoundsTxtEl.textContent = "Звуки действий";

    this.inputEnableAction = document.createElement("input");
    this.inputEnableAction.type = "checkbox";
    this.inputEnableAction.dataset.sound = "action";
    this.inputEnableAction.name = "sound-control";
    this.inputEnableAction.checked = !this.enabledSounds.action;

    this.labelActionSounds = document.createElement("label");
    this.labelActionSounds.className = "label-setting";

    this.labelActionSounds.append(actionSoundsTxtEl, this.inputEnableAction);
    managerActionSounds.append(this.labelActionSounds);

    this.containerChandeSounds.append(
      soundsTitleEl,
      managerBgm,
      managerActionSounds,
    );

    this.settingContainer.append(
      this.containerChangeName,
      this.containerChandeSounds,
    );

    this.app.append(this.header.element, namePage, this.settingContainer);
  }

  listeners() {
    this.btnChangeName.addEventListener("click", () => {
      this.divChangeName.classList.add("hidden");
      this.formChangeName.classList.remove("hidden");
      this.inputChangeName.focus();
    });

    this.formChangeName.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.inputChangeName.value.length < 3) {
        this.warning.classList.remove("hidden");
        return;
      }

      this.warning.classList.add("hidden");

      this.currentName = this.inputChangeName.value;

      localStorage.setItem("username-taty4", JSON.stringify(this.currentName));
      this.currentNameEl.textContent = this.currentName;

      this.formChangeName.classList.add("hidden");
      this.divChangeName.classList.remove("hidden");
    });

    this.containerChandeSounds.addEventListener("change", (event) => {
      const target = event.target;
      if (target.checked) {
        sounds.unmute(target.dataset.sound);
      } else {
        sounds.mute(target.dataset.sound);
      }
    });
  }
}
