document.addEventListener("DOMContentLoaded", function () {
  /* ==============Переход по страницам=========================== */
  // All pages
  const pages = document.querySelectorAll(".page");
  const homePage = document.querySelector(".home");
  const settingPage = document.querySelector(".setting");
  const profilePage = document.querySelector(".profile");
  const topSection = document.querySelector(".top-section");
  const fightPage = document.querySelector(".fight");

  //   Кнопки которые совершают переходы
  const btnCreateCharacter = document.querySelector(".btn-create-character");
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

  /*==================================Смена имени со страницы создания персонажа====================================  */

  // Перемнная с именем
  let savedName = localStorage.getItem("name");

  // При пеерезагрузке оставляю ранее введенное имя, если имя уже сохранено указываем его
  function getValueName() {
    if (savedName) {
      document.getElementById("name").value = savedName;
    } else {
      document.getElementById("name").value = "";
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

  /* =======================Смена имени на страние настроек ===================================== */

  const btnEdit = document.querySelector(".btn-edit");
  const inputSetting = document.querySelector(".edit-name-input");

  // Считаем количество кликов по кнопке edit
  let countClicks = 0;

  function countClick() {
    countClicks++;
    if (countClicks % 2 === 0) {
      btnEdit.textContent = "Edit";
    } else {
      btnEdit.textContent = "Save";
    }
  }

  // Кликаем по кнопке edit
  btnEdit.addEventListener("click", () => {
    inputSetting.classList.toggle("active");
    localStorage.setItem("name", inputSetting.value);
    savedName = localStorage.getItem("name");
    countClick();
    allChangeName();
  });

  /* ==========================Смена игрока====================================================== */

  const btnMainCharacter = document.querySelector(".button-change-character");
  const btnExtraCharacter = document.querySelectorAll(".choose-character");
  const changeCharacter = document.querySelector(".change-character");
  const extraCharacters = document.querySelectorAll(".extra-character");

  // Показываем-скрываем блок с доп персонажами
  btnMainCharacter.addEventListener("click", () => {
    changeCharacter.style.display = "flex";
    document.querySelector(".overlay-big").style.display = "block";
  });

  // При клике вне блока заурываем его
  document.addEventListener("mouseup", function (e) {
    if (!changeCharacter.contains(e.target)) {
      changeCharacter.style.display = "none";
      document.querySelector(".overlay-big").style.display = "none";
    }
  });

  // Тут текущий персонаж по классу, сама картинка
  const currentCharacter = document.querySelector(".main-character");

  // Источник главного персонажа
  let currentCharacterSrc = localStorage.getItem("character");

  // Клик по доп персонажам
  btnExtraCharacter.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      let a = currentCharacter.src;

      currentCharacter.src = `${extraCharacters[index].src}`;
      extraCharacters[index].src = `${a}`;

      localStorage.setItem("character", currentCharacter.src);

      document.querySelector(".overlay-big").style.display = "none";
      changeCharacter.style.display = "none";

      changeCharacterinFight(); /* импортировать эту функцию */
    });
  });

  /* =================================================================================== */
  const myCharacterContainer = document.getElementById(
    "my-character-container"
  );
  const myCharacterCreateImage = document.createElement("img");

  function changeCharacterinFight() {
    myCharacterCreateImage.src = `${currentCharacterSrc}`;
  }

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

  // Спаны куда надо записать победы и поражения
  let winsValue = document.querySelector(".wins-value");
  let losesValue = document.querySelector(".loses-value");

  /* =========================== В этой части по логике боя больше======================================== */
  const penguin = {
    id: 1,
    name: "Сute penguin",
    health: 120,
    damage: 40,
    critChance: 0.2,
    critCoefficient: 1.5,
    attackZones: 1,
    deffendZones: 2,
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
    attackZones: 1,
    deffendZones: 3,
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
  const allZones = ["head", "neck", "body", "belly", "legs"];

  const player = {
    name: savedName,
    health: 150,
    damage: 30,
    critChance: 0.1,
    critCoefficient: 1.5,
    attackZones: 1,
    deffendZones: 2,
  };

  // Переменные с зонами атак, защит и урона
  let damageToOpponent = 0;
  let damageToPlayer = 0;
  let playerAttack;
  let playerDefence;
  let opponentAtack;
  let opponentDefense;

  // Дивы у которых буду менять ширину для того чтобы на странице менялась шкала здоровья
  const innerHealthOpponent = document.querySelector(".inner-health-opponent");
  const innerHealthPlayer = document.querySelector(".inner-health-player");

  // Спаны в которые будут записываться текстовые значения текущего здоровья
  const currentHealthOpponentText = document.querySelector(
    ".opponent-current-health"
  );
  const currentHealthPlayerText = document.querySelector(".my-current-health");

  // Кнопка новый баттл и вспывающее окно с результатами боя
  const btnNewBattle = document.querySelector(".btn-new-battle");
  const battleResult = document.querySelector(".battle-result");

  // Переменные с текущим уровнем здоровья, уровень буду записывать в хранилище
  let currentHealthOpponent = Number(
    localStorage.getItem("currentHealthOpponent")
  );
  let currentHealthPlayer = Number(localStorage.getItem("currentHealthPlayer"));

  //   Установим пртивника и индекс из массива для противника
  let IndexOfCurrentOpponent = localStorage.getItem("IndexOfCurrentOpponent");

  let currentOpponnent = arrayOfOpponents[+IndexOfCurrentOpponent];

  //   Отрисую саму картинку, а его источники буду устанавливать в функции смены ротивника
  const nameOpponent = document.querySelector(".name-opponent");
  const containerOpponent = document.getElementById("opponent-container");
  const imgOpponent = document.createElement("img");
  containerOpponent.appendChild(imgOpponent);
  //   Переменная с общим здоровьем противника
  const allHealthOpponentText = document.querySelector(".all-health-opponent");
  //   Функция которая отрисовывает рандомного противнника

  function createOpponent() {
    IndexOfCurrentOpponent = Math.floor(
      Math.random() * arrayOfOpponents.length
    );

    // Получим сам обьект с противником по его индексу
    currentOpponnent = arrayOfOpponents[IndexOfCurrentOpponent];

    nameOpponent.textContent = currentOpponnent.name;
    imgOpponent.src = currentOpponnent.src;
    imgOpponent.alt = currentOpponnent.alt;
  }

  function saveOpponent() {
    nameOpponent.textContent = currentOpponnent.name;
    imgOpponent.src = currentOpponnent.src;
    imgOpponent.alt = currentOpponnent.alt;
  }

  if (IndexOfCurrentOpponent) {
    saveOpponent();
    changeVisualDamage(innerHealthPlayer, currentHealthPlayer, player.health);
    changeVisualDamage(
      innerHealthOpponent,
      currentHealthOpponent,
      currentOpponnent.health
    );
    allHealthOpponentText.textContent = currentOpponnent.health;
  } else {
    createOpponent();
    resetValueHealth();
  }

  //   Если вхранилище ничего нет то установим равными максимальному
  if (!currentHealthOpponent) {
    currentHealthOpponent = currentOpponnent.health;
  }
  if (!currentHealthPlayer) {
    currentHealthPlayer = player.health;
  }

  //Переменные где храниться количество побед и поражений
  let countWins = localStorage.getItem("countWins");
  let countLoses = localStorage.getItem("countLoses");

  // Если в хранилище нету данных побед и поражений ниже, то дадим значение ноль
  if (!countWins) {
    countWins = 0;
  }
  if (!countLoses) {
    countLoses = 0;
  }

  // Непосредственно выводим на экран значения побед и поражений
  // И сразу же вызываем
  function updateStatistic() {
    winsValue.textContent = countWins;
    losesValue.textContent = countLoses;
  }
  updateStatistic();

  /* Функция которая по окончанию боя будет показывать блок с результатами боя, 
пересчитывать и записывать в хранилище значения побед и поражений, а так же выводить
на экран новые значения побед и поражений. Отсюда же возьму переменню для вывода сообщения о том кто победил */
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

  /*  Эта функция полностью сбрасывает все что касается шкалы здоровья */
  function resetValueHealth() {
    currentHealthPlayer = player.health;
    currentHealthOpponent = currentOpponnent.health;

    // Записываем в хранилище, ведь мы поменяли значение здоровья
    localStorage.setItem("currentHealthOpponent", currentHealthOpponent);
    localStorage.setItem("currentHealthPlayer", currentHealthPlayer);

    //С
    currentHealthOpponentText.textContent = currentHealthOpponent;
    currentHealthPlayerText.textContent = currentHealthPlayer;

    // Устанавливаем ширину дива со внутренним здоровьем на 100%
    innerHealthOpponent.style.width = "100%";
    innerHealthPlayer.style.width = "100%";

    // Устанавливаем общее здоровье противника
    allHealthOpponentText.textContent = currentOpponnent.health;
  }

  let battleLogs = JSON.parse(localStorage.getItem("battleLogs")) || [];
  const battleResultText = document.querySelector(".log-result");
  console.log(localStorage.getItem("battleLogs"));
  writeLogs();
  //   Клик по кнопке новы баттл,должна закрывать само всплывающее окно,
  // отрисовывать нового противника,  возвращать визуальную шкалу здоровья на 100%, устанавливать
  // числовое и текстовое состоянии здоровья текущего на первоначальное значение, у противника менять общее здоровье
  //   То есть чтобы визуально шкала обновилась полностью и внешене и по значенияь
  btnNewBattle.addEventListener("click", () => {
    battleLogs = [];
    localStorage.removeItem("battleLogs");
    battleResultText.innerHTML = "";
    writeLogs();
    localStorage.removeItem("IndexOfCurrentOpponent");
    createOpponent();
    resetValueHealth();
    battleResult.style.display = "none";
  });

  /* ==================================БОЙ================================================= */
  const btnThrow = document.querySelector(".btn-throw");
  btnThrow.disabled = true;
  // Валидация чекбоксов
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

  // В этой функии считаю какой урон был нанесен
  function calculateDamage(attacker, defender, attackZones, defendZones) {
    let totalDamage = 0;
    const events = [];

    attackZones.forEach((zone) => {
      const isBlocked = defendZones.includes(zone);

      let damage = attacker.damage;

      const isCrit = Math.random() < attacker.critChance;

      if (isCrit) damage *= attacker.critCoefficient;

      const dealDamage = !isBlocked || isCrit ? damage : 0;
      totalDamage += dealDamage;
      events.push({
        attacker: attacker.name,
        defender: defender.name,
        target: zone,
        blocked: isBlocked,
        crit: isCrit,
        damage: dealDamage,
      });
    });
    return { totalDamage, events };
  }

  function writeLogs() {
    battleLogs.forEach((event) => {
      const p = document.createElement("p");
      p.innerHTML = event;

      battleResultText.appendChild(p);
      battleResultText.scrollTop = battleResultText.scrollHeight;
    });
  }
  /* ==================================================================================================== */
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
    const resultPlayer = calculateDamage(
      player,
      currentOpponnent,
      playerAttack,
      opponentDefense
    );

    damageToOpponent = resultPlayer.totalDamage;

    const resultOpponent = calculateDamage(
      currentOpponnent,
      player,
      opponentAtack,
      playerDefence
    );

    damageToPlayer = resultOpponent.totalDamage;

    // Пересчитываю новые значение здоровья противника и игрока
    currentHealthOpponent -= damageToOpponent;
    currentHealthPlayer -= damageToPlayer;

    // Запишем в локал сторедж текущее значение здоровья
    localStorage.setItem("currentHealthOpponent", currentHealthOpponent);
    localStorage.setItem("currentHealthPlayer", currentHealthPlayer);

    // Записываю индекс того перса кем играем
    localStorage.setItem("IndexOfCurrentOpponent", IndexOfCurrentOpponent);

    // Вывожу на экран запись лога
    validateCheckbox();
    // Тут вызываем функцию которая уменьшает шкалу здоровья
    changeVisualDamage(innerHealthPlayer, currentHealthPlayer, player.health);
    changeVisualDamage(
      innerHealthOpponent,
      currentHealthOpponent,
      currentOpponnent.health
    );

    // Вывожу на экран запись лога

    const allEvents = [...resultPlayer.events, ...resultOpponent.events];

    allEvents.forEach((event) => {
      const logText = battleEvent(event);

      const p = document.createElement("p");
      p.innerHTML = logText;

      battleResultText.appendChild(p);

      battleLogs.push(logText);

      localStorage.setItem("battleLogs", JSON.stringify(battleLogs));
      battleResultText.scrollTop = battleResultText.scrollHeight;
    });
    checkBattleOver();
  });

  //   Эта функция меняет при клике на кноаку бросать визуальное состояние здоровья (и шкалу и текста)
  function changeVisualDamage(character, currentHealth, allHealth) {
    character.style.width = `${(currentHealth / allHealth) * 100}%`;
    currentHealthOpponentText.textContent = currentHealthOpponent;
    currentHealthPlayerText.textContent = currentHealthPlayer;
  }

  /* ================================Запись лога====================================== */

  /*  function addLog(message) {
    const battleResultText = docoment.querySelector("..log-result");
    battleResultText.textContent += message + "\n";
    battleResultText.scrollTop = battleResultText.scrollHeight;
  } */

  // Функция генерации текста хода
  function battleEvent(event) {
    const { attacker, defender, target, blocked, crit, damage } = event;

    let attackerSpan = `<span class="attacker">${attacker}</span>`;
    let defenderSpan = `<span class="defender">${defender}</span>`;
    let targetSpan = `<span class="target">${target}</span>`;
    let damageSpan = `<span class="damage">${damage} damage</span>`;

    if (event.attacker === savedName) {
      attackerSpan = `<span class="attacker player">${attacker}</span>`;
      damageSpan = `<span class="damage player">${damage} damage</span>`;
    } else {
      defenderSpan = `<span class="defender player">${defender}</span>`;
    }

    if (blocked && damage === 0) {
      return `${attackerSpan} attacked ${defenderSpan} to ${targetSpan} but ${defenderSpan} block the attack.`;
    }
    if (crit) {
      return `${attackerSpan} attacked ${defenderSpan} to ${targetSpan}, ${defenderSpan} tried to block but ${attacker} was very lucky and crit for ${damageSpan}.`;
    }
    return `${attackerSpan} attacked ${defenderSpan} to ${targetSpan} and dealt  ${damageSpan}.`;
  }
});
