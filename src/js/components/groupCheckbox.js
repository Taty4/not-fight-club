export class GroupCheckbox {
  zones;
  element;
  isValid = false;

  constructor(type, zones, config, callback) {
    this.type = type;
    this.onChange = callback;
    this.zones = zones;
    this.config = config;
    this.zonesKeys = Object.keys(this.zones);
    this.create();

    this.listener();
  }

  listener() {
    this.element.addEventListener("change", () => {
      this.slectedInputs = this.element.querySelectorAll(
        'input[type="checkbox"]:checked',
      );
      this.checkValid();
      this.onChange();
    });
  }

  create() {
    this.element = document.createElement("div");
    this.element.className = `${this.type}-zones-container zones-container`;

    this.zonesKeys.forEach((key) => {
      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.name = this.type;
      checkBox.id = `${this.type}-${key}`;
      checkBox.value = key;

      const label = document.createElement("label");
      label.htmlFor = `${this.type}-${key}`;
      label.textContent = `${this.zones[key].label}`;
      label.className = `label-zones label-zones-${this.type}`;

      this.element.append(checkBox, label);
    });

    this.info = document.createElement("p");
    this.info.className = `info-zones info-zones-${this.type}`;
    let infoText;
    if (this.type === "attack") {
      infoText = `Выберите ${this.config.attack} зоны атаки`;
    } else {
      infoText = `Выберите ${this.config.defense} зоны защиты`;
    }
    this.info.textContent = infoText;
    this.element.append(this.info);
  }

  checkValid() {
    if (
      this.type === "attack" &&
      this.slectedInputs.length === this.config.attack
    ) {
      this.isValid = true;
      return;
    }
    if (
      this.type === "defense" &&
      this.slectedInputs.length === this.config.defense
    ) {
      this.isValid = true;
      return;
    }

    this.isValid = false;
  }

  getSelectedZones() {
    return Array.from(this.slectedInputs).map((input) => input.value);
  }
}
