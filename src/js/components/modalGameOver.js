export class ModalGameOver {
  element;

  constructor(callback) {
    this.handleNewGame = callback;
    this.render();
    this.listener();
  }

  listener() {
    this.btnNewBattle.addEventListener("click", () => this.handleNewGame());
  }

  render() {
    this.element = document.createElement("div");
    this.element.className = "overlay-modal";

    this.modal = document.createElement("div");
    this.modal.className = "modal";

    this.textModal = document.createElement("p");
    this.textModal.className = "text-modal";

    this.btnNewBattle = document.createElement("button");
    this.btnNewBattle.className = "modal-button";
    this.btnNewBattle.textContent = "Новая игра";

    this.modal.append(this.textModal, this.btnNewBattle);
    this.element.append(this.modal);
  }

  showModal(looser) {
    if (looser === "player") {
      this.textModal.textContent =
        "Защита рухнула, битва проиграна. Сделай выводы и перекуй свое оружие!";
    } else if (looser === "enemy") {
      this.textModal.textContent =
        "Твое сердце бьется в такт победе. Враг повержен к твоим ногам";
    } else {
      this.textModal.textContent =
        "Оружие скрестилось в последний раз, оборвав две судьбы! Вы разделили одну смерть на двоих";
    }

    this.element.classList.add("visible");
  }

  hideModal() {
    this.element.classList.remove("visible");
  }
}
