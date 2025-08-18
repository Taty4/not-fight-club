document.addEventListener("DOMContentLoaded", function () {
  //Переход настраницу настроек
  btnSetting.addEventListener("click", () => {
    pages.forEach((page) => {
      page.style.display = "none";
    });
    settingPage.style.display = "flex";
    topSection.style.display = "flex";
    textTopSection.textContent = "Setting";
  });

  // Переход на страницу дом
  btnHome.addEventListener("click", () => {
    pages.forEach((page) => {
      page.style.display = "none";
    });
    homePage.style.display = "flex";
    topSection.style.display = "flex";
    textTopSection.textContent = "Main";
  });

  // Переход на страницу профиля
  btnProfile.addEventListener("click", () => {
    pages.forEach((page) => {
      page.style.display = "none";
    });
    profilePage.style.display = "flex";
    topSection.style.display = "flex";
    textTopSection.textContent = "Profile";
  });

  // Переход на страницу боя
  btnFight.addEventListener("click", () => {
    pages.forEach((page) => {
      page.style.display = "none";
    });
    fightPage.style.display = "flex";
    topSection.style.display = "flex";
    textTopSection.textContent = "Fight";
  });

  // Переход на страницу дом со страницы создания персонажа
  btnCreateCharacter.addEventListener("click", saveName);
  btnCreateCharacter.addEventListener("click", () => {
    pages.forEach((page) => {
      page.style.display = "none";
    });
    homePage.style.display = "flex";
    topSection.style.display = "flex";
  });

  // Тут хранится переменная имени
  let savedName = localStorage.getItem("name");

  // При пеерезагрузке оставляю ранее введенное имя
  function getValueName() {
    if (savedName) {
      document.getElementById("name").value = savedName;
    } else {
      document.getElementById("name").value = "Enter your name";
    }
  }
  getValueName();

  // Функия которая меняет имя во всех местах
  function allChangeName() {
    document.querySelector(".current-name").textContent = savedName;
    document.querySelector(".current-name-profile").textContent = savedName;
    document.querySelector(".name-fight").textContent = savedName;
    document.querySelector(".edit-name-input").value = savedName;
  }

  // Сохранение имени при создании персонажа
  function saveName() {
    let nameValue = document.getElementById("name").value;
    localStorage.setItem("name", nameValue);
    savedName = localStorage.getItem("name");
    allChangeName();
  }

  // Смена текста кнопки по клику на кнопку в настройках
  let countClicks = 0;

  function countClick() {
    countClicks++;
    if (countClicks % 2 === 0) {
      btnEdit.textContent = "Edit";
    } else {
      btnEdit.textContent = "Save";
    }
  }
  const btnEdit = document.querySelector(".btn-edit");
  // change name in Setting
  const inputSetting = document.querySelector(".edit-name-input");

  btnEdit.addEventListener("click", () => {
    inputSetting.classList.toggle("active");
    localStorage.setItem("name", inputSetting.value);
    savedName = localStorage.getItem("name");
    countClick();
    allChangeName();
  });

  /* ==================Храним колечество побед и поражений==================== */

  // Смена персонажа
  // Кнопки
  const btnMainCharacter = document.querySelector(".button-change-character");
  const changeCharacter = document.querySelector(".change-character");

  // Показываем-скрываем блок с доп персонажами
  btnMainCharacter.addEventListener("click", () => {
    changeCharacter.style.display = "flex";
    document.querySelector(".overlay-big").style.display = "block";
  });

  document.addEventListener("mouseup", function (e) {
    if (!changeCharacter.contains(e.target)) {
      changeCharacter.style.display = "none";
      document.querySelector(".overlay-big").style.display = "none";
    }
  });

  // Тут текущий персонаж по классу сама картинка
  const currentCharacter = document.querySelector(".main-character");
  // Источник главного персонажа

  let currentCharacterSrc = localStorage.getItem("character");

  const btnExtraCharacter = document.querySelectorAll(".choose-character");

  // Коллекция картинок доп персонажей
  let extraCharacters = document.querySelectorAll(".extra-character");

  // Клик по доп персонажам
  btnExtraCharacter.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      let a = currentCharacter.src;
      currentCharacter.src = `${extraCharacters[index].src}`;
      localStorage.setItem("character", currentCharacter.src);
      currentCharacterSrc = localStorage.getItem("character");
      extraCharacters[index].src = `${a}`;
      document.querySelector(".overlay-big").style.display = "none";
      changeCharacter.style.display = "none";

      changeCharacterinFight();
    });
  });

  /* =========Fight============== */
  const myCharacterContainer = document.getElementById(
    "my-character-container"
  );
  const myCharacterCreateImage = document.createElement("img");

  function changeCharacterinFight() {
    myCharacterCreateImage.src = `${currentCharacterSrc}`;
  }
  /* ====================================================== */
  function startCreateCharacter() {
    myCharacterCreateImage.alt = "Your Character";
    myCharacterContainer.appendChild(myCharacterCreateImage);
    if (currentCharacterSrc) {
      myCharacterCreateImage.src = `${currentCharacterSrc}`;
    } else {
      myCharacterCreateImage.src = `${currentCharacter.src}`;
    }
  }

  startCreateCharacter();

  /* ================================================================== */

  /* ============================================================ */
  // Спаны куда надо записать победы и поражения
  let winsValue = document.querySelector(".wins-value");
  let losesValue = document.querySelector(".loses-value");

  /* ======================================================================================================================= */
  const penguin = {
    id: 1,
    name: "Сute penguin",
    health: 120,
    damage: 40,
    critChance: 0.2,
    critCoefficient: 1.5,
    attackZones: 2,
    deffendZones: 1,
    src: "./assets/main-character/пингвин.jpg",
    alt: "Opponent penguin",
  };

  const deer = {
    id: 2,
    name: "Terrible deer",
    health: 100,
    damage: 25,
    critChance: 0.2,
    critCoefficient: 1.5,
    attackZones: 2,
    deffendZones: 1,
    src: "./assets/main-character/олень.jpg",
    alt: "Opponent deer",
  };

  const snowMaiden = {
    id: 3,
    name: "Snow Maiden",
    health: 150,
    damage: 30,
    critChance: 0.1,
    critCoefficient: 1.5,
    attackZones: 2,
    deffendZones: 1,
    src: "./assets/main-character/снегурка.jpg",
    alt: "Opponent snow maiden",
  };

  const arrayOfOpponents = [penguin, deer, snowMaiden];

  const player = {
    /*    name: "Snow Maiden", */
    health: 150,
    damage: 30,
    critChance: 0.1,
    critCoefficient: 1.5,
    attackZones: 1,
    deffendZones: 2,
  };

  const allZones = ["head", "neck", "body", "belly", "legs"];

  const btnThrow = document.querySelector(".btn-throw");
  btnThrow.disabled = true;

  function validateCheckbox() {
    /* Собираем в маленький коллекцию те зоны что выбраны игроком и проверяем количество выбранных чеков */
    const playerAttack = document.querySelectorAll(
      "input[name='attack']:checked"
    ).length;

    const playerDefence = document.querySelectorAll(
      "input[name='defence']:checked"
    ).length;
    // Блок кнопки если неправильно выьраны чекбоксы
    if (
      playerAttack == player.attackZones &&
      playerDefence == player.deffendZones
    ) {
      btnThrow.disabled = false;
    } else {
      btnThrow.disabled = true;
    }
  }

  /* =======Обрфботчик для чекбоксов============= */
  document
    .querySelectorAll("input[name='attack'], input[name='defence']")
    .forEach((a) => {
      a.addEventListener("change", validateCheckbox);
    });

  let damageToOpponent = 0;
  let damageToPlayer = 0;
  let playerAttack;
  let playerDefence;
  let opponentAtack;
  let opponentDefense;
  let currentHealthOpponent = Number(
    localStorage.getItem("currentHealthOpponent")
  );
  let currentHealthPlayer = Number(localStorage.getItem("currentHealthPlayer"));
  const innerHealthOpponent = document.querySelector(".inner-health-opponent");
  const innerHealthPlayer = document.querySelector(".inner-health-player");

  // Переменная с результатом боя
  let countWins = localStorage.getItem("countWins");
  let countLoses = localStorage.getItem("countLoses");
  const btnNewBattle = document.querySelector(".btn-new-battle");
  const battleResult = document.querySelector(".battle-result");
  const currentHealthOpponentText = document.querySelector(
    ".opponent-current-health"
  );
  const currentHealthPlayerText = document.querySelector(".my-current-health");

  if (!countWins) {
    countWins = 0;
  }
  if (!countLoses) {
    countLoses = 0;
  }

  let resultOfBattle = "";

  function checkBattleOver() {
    if (currentHealthPlayer <= 0 || currentHealthOpponent <= 0) {
      if (currentHealthPlayer <= 0 && currentHealthOpponent <= 0) {
        resultOfBattle = "Dead heat";
      } else if (currentHealthPlayer <= 0) {
        countLoses++;
        localStorage.setItem("countLoses", countLoses);
        updateStatistic();
        resultOfBattle = "You lost";
      } else {
        countWins++;
        localStorage.setItem("countWins", countWins);
        updateStatistic();
        resultOfBattle = "You won";
      }

      battleResult.style.display = "flex";
    }
  }

  // Обновяем количество побед и поражений на странице
  function updateStatistic() {
    winsValue.textContent = countWins;
    losesValue.textContent = countLoses;
  }
  updateStatistic();

  let IndexOfCurrentOpponent = Math.floor(
    Math.random() * arrayOfOpponents.length
  );
  let currentOpponnent = arrayOfOpponents[IndexOfCurrentOpponent];

  /*  if (!currentHealthOpponent) {
    currentHealthOpponent = currentOpponnent.health;
  }

  if (!currentHealthPlayer) {
    currentHealthPlayer = player.health;
  }
 */

  function updateValueHealth() {
    currentHealthPlayer = player.health;
    currentHealthOpponent = currentOpponnent.health;

    localStorage.setItem("currentHealthOpponent", currentHealthOpponent);
    localStorage.setItem("currentHealthPlayer", currentHealthPlayer);

    currentHealthOpponentText.textContent = currentOpponnent.health;
    currentHealthPlayerText.textContent = player.health;

    const allHealthOpponent = document.querySelector(".all-health-opponent");
    allHealthOpponent.textContent = currentOpponnent.health;
    createOpponent();
  }

  if (!IndexOfCurrentOpponent) {
    IndexOfCurrentOpponent = Math.floor(
      Math.random() * arrayOfOpponents.length
    );
  }

  function createOpponent() {
    let IndexOfCurrentOpponent = Math.floor(
      Math.random() * arrayOfOpponents.length
    );
    let currentOpponnent = arrayOfOpponents[IndexOfCurrentOpponent];
    const nameOpponent = document.querySelector(".name-opponent");

    const containerOpponent = document.getElementById("opponent-container");
    const firstOpponent = document.createElement("img");
    firstOpponent.src = currentOpponnent.src;
    firstOpponent.alt = currentOpponnent.alt;
    containerOpponent.appendChild(firstOpponent);

    nameOpponent.textContent = currentOpponnent.name;
  }

  btnNewBattle.addEventListener("click", () => {
    updateValueHealth();
    createOpponent();
    setVisualHealth();
    battleResult.style.display = "none";
  });

  // Функия которая устанавивает начальные значения виу
  function setVisualHealth() {
    innerHealthPlayer.style.width = `${
      (currentHealthPlayer / player.health) * 100
    }%`;

    innerHealthOpponent.style.width = `${
      (currentHealthOpponent / currentOpponnent.health) * 100
    }%`;
    if (currentHealthOpponent <= 0 || currentHealthPlayer <= 0) {
      battleResult.style.display = "flex";
    }
  }

  setVisualHealth();

  ///* =============СLick btn================ */
  btnThrow.addEventListener("click", () => {
    playerAttack = Array.from(
      document.querySelectorAll("input[name='attack']:checked")
    ).map((a) => a.value);

    playerDefence = Array.from(
      document.querySelectorAll("input[name='defence']:checked")
    ).map((a) => a.value);

    // Сброс выбранныч ранее чекбщксов
    document
      .querySelectorAll("input[name='attack']")
      .forEach((a) => (a.checked = false));

    document
      .querySelectorAll("input[name='defence']")
      .forEach((a) => (a.checked = false));

    // Тут пишем функию которая перемешивает массив всех зон (раотает при каждом клике на кнопку throw)
    function getRandomZones(zones, count) {
      const allZonesCopy = zones.concat([]);
      for (let i = zones.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allZonesCopy[i], allZonesCopy[j]] = [allZonesCopy[j], allZonesCopy[i]];
      }
      return allZonesCopy.slice(0, count);
    }

    // Тут сoздаем маленькие массивы из атак и защит противника
    opponentAtack = getRandomZones(allZones, currentOpponnent.attackZones);

    opponentDefense = getRandomZones(allZones, currentOpponnent.deffendZones);

    // Тут считаю урон нанесенный противнику и герою
    damageToOpponent = calculateDamage(
      player,
      currentOpponnent,
      playerAttack,
      opponentDefense
    );

    damageToPlayer = calculateDamage(
      currentOpponnent,
      player,
      opponentAtack,
      playerDefence
    );

    // Пересчитываю новые значение здоровья противника и игрока
    currentHealthOpponent -= damageToOpponent;
    currentHealthPlayer -= damageToPlayer;

    // Запишем в локал сторедж текущее значение здоровья
    localStorage.setItem("currentHealthOpponent", currentHealthOpponent);
    localStorage.setItem("currentHealthPlayer", currentHealthPlayer);

    // Записываем лог боя в массив
    writeLogOfButtle();
    validateCheckbox();
    // Тут вызываем функцию которая уменьшает шкалу здоровья
    changeVisualDamage(innerHealthPlayer, currentHealthPlayer, player.health);
    changeVisualDamage(
      innerHealthOpponent,
      currentHealthOpponent,
      currentOpponnent.health
    );
    checkBattleOver();
  });

  // В этой функии считаю какой урон был нанесен
  function calculateDamage(attacker, defender, attackZones, defendZones) {
    let totalDamage = 0;

    attackZones.forEach((zone) => {
      const isBlocked = defendZones.includes(zone);
      let damage = attacker.damage;
      const isCrit = Math.random() < attacker.critChance;

      if (isCrit) damage *= attacker.critCoefficient;

      if (!isBlocked || isCrit) totalDamage += damage;
    });
    return totalDamage;
  }

  // Массив в котором xраняться логи боя
  let battleLog = [];

  // Эта функция записывает лог боя в массив
  function writeLogOfButtle() {
    battleLog.push(
      `${savedName} attacked  ${currentOpponnent.name} to ${playerAttack.join(
        ", "
      )} and deal ${damageToOpponent} damage`
    );

    /*  battleLog.push(
      `${
        arrayOfOpponents[0].name
      } attacked  ${savedName} to ${opponentAtack.join(
        ", "
      )} and deal ${damageToPlayer} damage`
    ); */
    opponentAtack.forEach((zone) => {
      battleLog.push(
        `${currentOpponnent.name} attacked  ${savedName} to ${zone} and deal ${damageToPlayer} damage`
      );
    });
  }

  // Функия которая будет менять и сохранять текущее визуаьное и текстовое значение урона

  function changeVisualDamage(character, currentHealth, allHealth) {
    character.style.width = `${(currentHealth / allHealth) * 100}%`;
    currentHealthOpponentText.textContent = currentHealthOpponent;
    currentHealthPlayerText.textContent = currentHealthPlayer;
  }
});
/* ==========Мешаем массив c противниками================= */

/* =======Тут пишем имя оппонента и его жизни полная */

// Фукция которая отрисовывает противника

/* ==============Сам бой======================== */

// Написать функцию которая будет созранять страницу на которой находились
// Определиться когда будет перемешиваться массив
// Оставляю на завтра single page application
