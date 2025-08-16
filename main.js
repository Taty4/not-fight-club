document.addEventListener("DOMContentLoaded", function () {
  // Change pages
  const pages = document.querySelectorAll(".page");
  const homePage = document.querySelector(".home");
  const settingPage = document.querySelector(".setting");
  const profilePage = document.querySelector(".profile");
  const topSection = document.querySelector(".top-section");

  // Buttons
  const btnCreateCharacter = document.querySelector(".btn-create-character");
  const btnEdit = document.querySelector(".btn-edit");
  const btnHome = document.querySelector(".icon-home");
  const btnProfile = document.querySelector(".icon-profile");
  const btnSetting = document.querySelector(".icon-setting");
  let textTopSection = document.querySelector(".main-txt");

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
});
