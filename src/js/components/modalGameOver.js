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
      this.textModal.textContent = "Удача не на вашей стороне. Вы проиграли!";
    } else if (looser === "enemy") {
      this.textModal.textContent =
        "Удача сегодня повернулась к вам лицом. Вы победили";
    } else {
      this.textModal.textContent = "Сегодня никто не выжил!";
    }

    this.element.classList.add("visible");
  }

  hideModal() {
    this.element.classList.remove("visible");
  }
}
