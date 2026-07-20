export class GroupCheckbox {
  zones = ["head", "leg", "body", "neck", "arm", "stomach"];
  element;
  isValid = false;
  constructor(type, callback) {
    this.type = type;
    this.onChange = callback;

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

    for (let i = 0; i < this.zones.length; i++) {
      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.name = this.type;
      checkBox.id = `${this.type}-${this.zones[i]}`;
      checkBox.value = this.zones[i];

      const label = document.createElement("label");
      label.htmlFor = `${this.type}-${this.zones[i]}`;
      label.textContent = `${this.zones[i]}`;
      label.className = `label-zones label-zones-${this.type}`;

      this.element.append(checkBox, label);
    }
  }

  checkValid() {
    if (this.type === "attack" && this.slectedInputs.length === 2) {
      this.isValid = true;
      return;
    }
    if (this.type === "defense" && this.slectedInputs.length === 1) {
      this.isValid = true;
      return;
    }
    this.isValid = false;
  }

  getSelectedZones() {
    return Array.from(this.slectedInputs).map((input) => input.value);
  }
}
