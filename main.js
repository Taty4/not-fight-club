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

  // Тут хранится переменная имени
  let savedName = localStorage.getItem("name");

  let textSetting = document.querySelector(".text-setting");
  // Сщчранение имени при создании персонажа
  function saveName() {
    let nameValue = document.getElementById("name").value;
    localStorage.setItem("name", nameValue);
    // save in savedname current value
    savedName = localStorage.getItem("name");
    // change text in setting curren name

    textSetting.textContent = `Player Name: ${savedName}`;
    // save curren namein input in setting
    document.querySelector(".edit-name-input").value = savedName;
  }

  // Переход на страницу дом со страницы создания персонажа
  btnCreateCharacter.addEventListener("click", saveName);
  btnCreateCharacter.addEventListener("click", () => {
    pages.forEach((page) => {
      page.style.display = "none";
    });
    homePage.style.display = "flex";
    topSection.style.display = "flex";
  });

  // При пеерезагрузке оставляю ранее введенное имя
  function getValueName() {
    if (savedName) {
      document.getElementById("name").value = savedName;
    }
  }
  getValueName();

  // Смена текста кнопки по клику на кнопку в настройках
  let countClicks = 0;

  function countClick() {
    countClicks++;
    console.log(countClicks % 2);
    if (countClicks % 2 === 0) {
      btnEdit.textContent = "Edit";
    } else {
      btnEdit.textContent = "Save";
    }
    console.log(btnEdit);
  }

  btnEdit.addEventListener("click", countClick);

  // change name in Setting
  btnEdit.addEventListener("click", () => {
    const inputSetting = document.querySelector(".edit-name-input");
    inputSetting.classList.toggle("active");
    savedName = document.querySelector(".edit-name-input").value;
    localStorage.setItem("name", savedName);

    textSetting.textContent = `Player Name: ${savedName}`;
  });

  console.log(savedName);
  // Сраница смны персонажа
  // Переписываю имя персонажа
  const textProfile = document.querySelector(".text-profile");
  textProfile.textContent = `Your name: ${savedName}`;
  // Coxрфняю в переменные побед и проигрышей
  let winsValue = document.querySelector(".wins-value");
  let losesValue = document.querySelector(".loses-value");

  // current character
  const btnMainCharacter = document.querySelector(".button-change-character");
  // Block with chang character
  const changeCharacter = document.querySelector(".change-character");
  // Click current character
  btnMainCharacter.addEventListener("click", () => {
    changeCharacter.style.display = "flex";
    document.querySelector(".overlay-big").style.display = "block";
  });

  // При клике вне блока с доп персонажами закрываем блок персонажей
  document.addEventListener("mouseup", function (e) {
    if (!changeCharacter.contains(e.target)) {
      changeCharacter.style.display = "none";
      document.querySelector(".overlay-big").style.display = "none";
    }
  });

  // Блок с картинкой главного персонажа
  const currentCharacter = document.querySelector(".main-character");
  // Переменная с локал сторедж источника
  let currentCharacterSrc = localStorage.getItem("character");

  //Собираю в коллекцию кнопки доп персонажей
  const btnExtraCharacter = document.querySelectorAll(".choose-character");

  // Контейнер сдля картинки персонажа на странице боя
  const myCharacter = document.getElementById("my-character-container");

  // Первоначальное создание картинки на странице боя
  const myCharacterCreateImage = document.createElement("img");
  myCharacterCreateImage.src = `${currentCharacterSrc}`;
  myCharacter.appendChild(myCharacterCreateImage);

  // Прохожусь циклом по копкам выбора и при нажатии на какую то меняем местами текущего персонажа и дополнительного
  btnExtraCharacter.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // Коллекция картинок с доп персонажами
      let extraCharacters = document.querySelectorAll(".extra-character");

      // Массив с источниками картинок оп персонажей
      const arraySrc = [];
      for (let i = 0; i < extraCharacters.length; i++) {
        arraySrc.push(extraCharacters[i].src);
      }

      // Созраняем источник первоначальной картинки
      let a = currentCharacter.src;

      // Заменяем источник изначальной картинки на тот который был кликнут
      currentCharacter.src = `${arraySrc[index]}`;

      // Сохраняем в локал источник той картинки котораятеперь встала на место основной
      localStorage.setItem("character", currentCharacter.src);

      // Получем источник теперь главной картинки
      currentCharacterSrc = localStorage.getItem("character");

      // Меняем источник кликнутой картинки на изначально основной
      extraCharacters[index].src = `${a}`;

      document.querySelector(".overlay-big").style.display = "none";
      changeCharacter.style.display = "none";

      // Меняем источник созданной картинки на стрранице боя
      changeCharacterinFight();
    });
  });

  // БОЙ
  // Функция которая меняет персонажа на страние боя в момент выбора персонажа на странице настроек
  function changeCharacterinFight() {
    myCharacterCreateImage.src = `${currentCharacterSrc}`;
  }

  // Тут вставляем имя персонажа сохраненное ранее
  const nameFight = document.querySelector(".name-fight");
  nameFight.textContent = `${savedName}`;

  const penguin = {
    name: "Сute penguin",
    alive: "120",
    src: "./assets/main-character/пингвин.jpg",
    alt: "Opponent penguin",
  };

  const deer = {
    name: "Terrible deer",
    alive: "100",
    src: "./assets/main-character/олень.jpg",
    alt: "Opponent deer",
  };

  const snowMaiden = {
    name: "Snow Maiden",
    alive: "150",
    src: "./assets/main-character/снегурка.jpg",
    alt: "Opponent snow maiden",
  };

  const arrayOfOpponents = [penguin, deer, snowMaiden];
  // Перешиваем массив
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /*   shuffleArray(arrayOfOpponents); */

  const nameOpponent = document.querySelector(".name-opponent");
  const currentAliveOpponent = document.querySelector(
    ".opponent-current-alive"
  );
  const allAliveOpponent = document.querySelector(".all-alive-opponent");
  currentAliveOpponent.textContent = arrayOfOpponents[0].alive;
  allAliveOpponent.textContent = arrayOfOpponents[0].alive;

  // Сoздаю первого персонажа
  const containerOpponent = document.getElementById("opponent-container");
  const firstOpponent = document.createElement("img");
  firstOpponent.src = arrayOfOpponents[0].src;
  firstOpponent.alt = arrayOfOpponents[0].alt;
  containerOpponent.appendChild(firstOpponent);
  nameOpponent.textContent = arrayOfOpponents[0].name;
  console.log(firstOpponent.src);
});
