document.addEventListener("DOMContentLoaded", function () {
  // Change pages
  const pages = document.querySelectorAll(".page");
  const homePage = document.querySelector(".home");
  const settingPage = document.querySelector(".setting");
  const profilePage = document.querySelector(".profile");
  const topSection = document.querySelector(".top-section");
  const fightPage = document.querySelector(".fight");

  // Buttons
  const btnCreateCharacter = document.querySelector(".btn-create-character");
  const btnEdit = document.querySelector(".btn-edit");
  const btnHome = document.querySelector(".icon-home");
  const btnProfile = document.querySelector(".icon-profile");
  const btnSetting = document.querySelector(".icon-setting");
  const textTopSection = document.querySelector(".main-txt");
  const btnFight = document.querySelector(".btn-fight");

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
  let winsValue = document.querySelector(".wins-value");
  let losesValue = document.querySelector(".loses-value");
  /* ======================================================================================================================= */
  const penguin = {
    name: "Сute penguin",
    health: "120",
    damage: 8,
    critChance: 0.1,
    critCoefficient: 1.5,
    attackZones: 1,
    deffendZones: 2,
    src: "./assets/main-character/пингвин.jpg",
    alt: "Opponent penguin",
  };

  const deer = {
    name: "Terrible deer",
    health: "100",
    damage: 10,
    critChance: 0.2,
    critCoefficient: 1.5,
    attackZones: 2,
    deffendZones: 1,
    src: "./assets/main-character/олень.jpg",
    alt: "Opponent deer",
  };

  const snowMaiden = {
    name: "Snow Maiden",
    health: "150",
    damage: 12,
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
    /*  health: "150", */
    damage: 10,
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

  ///* =============СLick btn================ */
  btnThrow.addEventListener("click", () => {
    console.log(btnThrow.disabled);
    const playerAttack = Array.from(
      document.querySelectorAll("input[name='attack']:checked")
    ).map((a) => a.value);

    const playerDefence = Array.from(
      document.querySelectorAll("input[name='defence']:checked")
    ).map((a) => a.value);

    // Сброс выбранныч ранее чекбщксов
    document
      .querySelectorAll("input[name='attack']")
      .forEach((a) => (a.checked = false));

    document
      .querySelectorAll("input[name='defence']")
      .forEach((a) => (a.checked = false));

    const opponentAtack = getRandomZones(
      allZones,
      arrayOfOpponents[0].attackZones
    );

    const opponentDefense = getRandomZones(
      allZones,
      arrayOfOpponents[0].deffendZones
    );

    validateCheckbox();
  });

  function getRandomZones(zones, count) {
    const allZonesCopy = zones.concat([]);
    for (let i = zones.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allZonesCopy[i], allZonesCopy[j]] = [allZonesCopy[j], allZonesCopy[i]];
    }
    return allZonesCopy.slice(0, count);
  }

  /*   
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

  const damageToOpponent = calculateDamage(
    player,
    arrayOfOpponents[0],
    playerAttack,
    opponentAtack
  );

  const damageToPlayer = calculateDamage(
    arrayOfOpponents[0],
    player,
    opponentAtack,
    playerAttack
  );

  arrayOfOpponents[0].health -= damageToOpponent;
  player.health -= damageToPlayer;

  let battleLog = [];

  battleLog.push(
    `${savedName} attacked  ${arrayOfOpponents[0].name} to ${playerAttack.join(
      ", "
    )} and deal ${damageToOpponent} damage`
  );

  battleLog.push(
    `${arrayOfOpponents[0].name} attacked  ${savedName} to ${opponentAtack.join(
      ", "
    )} and deal ${damageToPlayer} damage`
  ); */

  /* ==========Мешаем массив================= */
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /* =======Тут пишем имя оппонента и его жизни полная и текущая */
  const nameOpponent = document.querySelector(".name-opponent");
  const currentHealthOpponent = document.querySelector(
    ".opponent-current-health"
  );
  const allHealthOpponent = document.querySelector(".all-health-opponent");

  nameOpponent.textContent = arrayOfOpponents[0].name;
  currentHealthOpponent.textContent = arrayOfOpponents[0].health;
  allHealthOpponent.textContent = arrayOfOpponents[0].health;

  /* Тут создаем оппонента */
  const containerOpponent = document.getElementById("opponent-container");
  const firstOpponent = document.createElement("img");
  firstOpponent.src = arrayOfOpponents[0].src;
  firstOpponent.alt = arrayOfOpponents[0].alt;
  containerOpponent.appendChild(firstOpponent);
});

/* ==============Сам бой======================== */

// Написать функцию которая будет созранять страницу на которой находились
// Определиться когда будет перемешиваться массив
// Ну и бой:)
// Не забыть про количество побед и поражений
