document.addEventListener('DOMContentLoaded', function () {
  const pages = document.querySelectorAll('.page');
  const homePage = document.querySelector('.home');
  const settingPage = document.querySelector('.setting');
  const profilePage = document.querySelector('.profile');
  const topSection = document.querySelector('.top-section');
  const fightPage = document.querySelector('.fight');
  const createPage = document.querySelector('.create-character');

  const btnCreateCharacter = document.querySelector('.btn-create-character');
  const btnHome = document.querySelector('.icon-home');
  const btnProfile = document.querySelector('.icon-profile');
  const btnSetting = document.querySelector('.icon-setting');
  const textTopSection = document.querySelector('.main-txt');
  const btnFight = document.querySelector('.btn-fight');

  function showPage(page, title, withHeader = true) {
    pages.forEach((p) => (p.style.display = 'none'));
    page.style.display = 'flex';

    if (withHeader) {
      topSection.style.display = 'flex';
      textTopSection.textContent = title || '';
    } else topSection.style.display = 'none';
  }

  const routes = {
    home: () => showPage(homePage, 'Main'),
    setting: () => showPage(settingPage, 'Setting'),
    profile: () => showPage(profilePage, 'Profile'),
    fight: () => showPage(fightPage, 'Fight'),
    create: () => showPage(createPage, 'Create character'),
  };

  let savedName = localStorage.getItem('name');
  function updateSavedName() {
    savedName = localStorage.getItem('name');
  }

  function router() {
    updateSavedName();
    let hash = location.hash.slice(1);

    if (!savedName) {
      hash = 'create';
    } else if (!hash) {
      hash = 'home';
    }

    if (routes[hash]) {
      routes[hash]();
    } else {
      routes.home();
    }
  }

  btnHome.addEventListener('click', () => (location.hash = 'home'));
  btnSetting.addEventListener('click', () => (location.hash = 'setting'));
  btnProfile.addEventListener('click', () => (location.hash = 'profile'));
  btnFight.addEventListener('click', () => {
    location.hash = 'fight';
    IndexOfCurrentOpponent = localStorage.getItem('IndexOfCurrentOpponent');
    if (!IndexOfCurrentOpponent) {
      createOpponent();
    }
  });
  btnCreateCharacter.addEventListener('click', () => {
    saveName();
    location.hash = 'home';
    router();
  });

  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
  let IndexOfCurrentOpponent = localStorage.getItem('IndexOfCurrentOpponent');

  /*=======================================================================  */
  function getValueName() {
    if (savedName) {
      document.getElementById('name').value = savedName;
    } else {
      document.getElementById('name').value = '';
    }
  }
  getValueName();

  function allChangeName() {
    document.querySelector('.current-name').textContent = savedName;
    document.querySelector('.current-name-profile').textContent = savedName;
    document.querySelector('.name-fight').textContent = savedName;
    document.querySelector('.edit-name-input').value = savedName;
  }

  function saveName() {
    let nameValue = document.getElementById('name').value;
    localStorage.setItem('name', nameValue);
    savedName = localStorage.getItem('name');
    allChangeName();
  }
  saveName();

  /* ============================================================= */
  const btnEdit = document.querySelector('.btn-edit');
  const inputSetting = document.querySelector('.edit-name-input');

  let countClicks = 0;

  function countClick() {
    countClicks++;
    if (countClicks % 2 === 0) {
      btnEdit.textContent = 'Edit';
    } else {
      btnEdit.textContent = 'Save';
    }
  }

  btnEdit.addEventListener('click', () => {
    inputSetting.classList.toggle('active');
    localStorage.setItem('name', inputSetting.value);
    savedName = localStorage.getItem('name');
    countClick();
    allChangeName();
  });

  /* ================================================================================= */
  const btnMainCharacter = document.querySelector('.button-change-character');
  const btnExtraCharacter = document.querySelectorAll('.choose-character');
  const changeCharacter = document.querySelector('.change-character');
  const extraCharacters = document.querySelectorAll('.extra-character');

  btnMainCharacter.addEventListener('click', () => {
    changeCharacter.style.display = 'flex';
    document.querySelector('.overlay-big').style.display = 'block';
  });

  document.addEventListener('mouseup', function (e) {
    if (!changeCharacter.contains(e.target)) {
      changeCharacter.style.display = 'none';
      document.querySelector('.overlay-big').style.display = 'none';
    }
  });

  const currentCharacter = document.querySelector('.main-character');
  let currentCharacterSrc = localStorage.getItem('character');

  if (currentCharacterSrc) {
    currentCharacter.src = `${currentCharacterSrc}`;
  }

  btnExtraCharacter.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      currentCharacterSrc = extraCharacters[index].src;
      currentCharacter.src = `${currentCharacterSrc}`;
      localStorage.setItem('character', currentCharacterSrc);
      document.querySelector('.overlay-big').style.display = 'none';
      changeCharacter.style.display = 'none';
      changeCharacterinFight();
    });
  });

  const myCharacterContainer = document.getElementById(
    'my-character-container'
  );
  const myCharacterCreateImage = document.createElement('img');

  function changeCharacterinFight() {
    myCharacterCreateImage.src = `${currentCharacterSrc}`;
  }

  function startCreateCharacter() {
    myCharacterCreateImage.alt = 'Your Character';
    myCharacterContainer.appendChild(myCharacterCreateImage);
    if (currentCharacterSrc) {
      myCharacterCreateImage.src = `${currentCharacterSrc}`;
    } else {
      myCharacterCreateImage.src = `${currentCharacter.src}`;
    }
  }

  startCreateCharacter();

  let winsValue = document.querySelector('.wins-value');
  let losesValue = document.querySelector('.loses-value');

  /* ========================================== Battle======================================== */
  const boy = {
    id: 1,
    name: 'Shy boy',
    health: 120,
    damage: 34,
    critChance: 0.2,
    critCoefficient: 1.5,
    attackZones: 1,
    deffendZones: 2,
    src: './assets/opponents/boywebP.webp',
    alt: 'Opponent boy',
  };

  const mag = {
    id: 2,
    name: 'Powerful magician',
    health: 160,
    damage: 20,
    critChance: 0.1,
    critCoefficient: 1.5,
    attackZones: 1,
    deffendZones: 3,
    src: './assets/opponents/mag-oppwebP.webp',
    alt: 'Opponent mag',
  };

  const man = {
    id: 3,
    name: 'Cheerful man',
    health: 150,
    damage: 26,
    critChance: 0.2,
    critCoefficient: 1.5,
    attackZones: 1,
    deffendZones: 2,
    src: './assets/opponents/man-oppwebP.webp',
    alt: 'Opponent man',
  };

  const girl = {
    id: 4,
    name: 'Cheeky girl',
    health: 140,
    damage: 30,
    critChance: 0.1,
    critCoefficient: 1.5,
    attackZones: 2,
    deffendZones: 1,
    src: './assets/opponents/women-oppwebP.webp',
    alt: 'Opponent man',
  };

  const girl2 = {
    id: 5,
    name: 'Cutie',
    health: 130,
    damage: 28,
    critChance: 0.2,
    critCoefficient: 1.5,
    attackZones: 2,
    deffendZones: 1,
    src: './assets/opponents/woman2webP.webp',
    alt: 'Opponent girl2',
  };

  const arrayOfOpponents = [boy, mag, man, girl, girl2];
  const allZones = ['head', 'neck', 'body', 'belly', 'legs'];

  const player = {
    name: savedName,
    health: 150,
    damage: 30,
    critChance: 0.2,
    critCoefficient: 1.5,
    attackZones: 1,
    deffendZones: 2,
  };

  let damageToOpponent = 0;
  let damageToPlayer = 0;
  let playerAttack;
  let playerDefence;
  let opponentAtack;
  let opponentDefense;

  const innerHealthOpponent = document.querySelector('.inner-health-opponent');
  const innerHealthPlayer = document.querySelector('.inner-health-player');

  const currentHealthOpponentText = document.querySelector(
    '.opponent-current-health'
  );
  const currentHealthPlayerText = document.querySelector('.my-current-health');

  const btnNewBattle = document.querySelector('.btn-new-battle');
  const battleResult = document.querySelector('.battle-result');

  let currentHealthOpponent = Number(
    localStorage.getItem('currentHealthOpponent')
  );
  let currentHealthPlayer = Number(localStorage.getItem('currentHealthPlayer'));

  let currentOpponnent = arrayOfOpponents[+IndexOfCurrentOpponent];

  const nameOpponent = document.querySelector('.name-opponent');
  const containerOpponent = document.getElementById('opponent-container');
  const imgOpponent = document.createElement('img');
  containerOpponent.appendChild(imgOpponent);

  const allHealthOpponentText = document.querySelector('.all-health-opponent');

  function createOpponent() {
    IndexOfCurrentOpponent = Math.floor(
      Math.random() * arrayOfOpponents.length
    );

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
    changeVisualDamage();
    allHealthOpponentText.textContent = currentOpponnent.health;
  } else {
    createOpponent();
    resetValueHealth();
  }

  if (!currentHealthOpponent) {
    currentHealthOpponent = currentOpponnent.health;
  }
  if (!currentHealthPlayer) {
    currentHealthPlayer = player.health;
  }

  let countWins = localStorage.getItem('countWins');
  let countLoses = localStorage.getItem('countLoses');

  if (!countWins) {
    countWins = 0;
  }
  if (!countLoses) {
    countLoses = 0;
  }

  function updateStatistic() {
    winsValue.textContent = countWins;
    losesValue.textContent = countLoses;
  }
  updateStatistic();

  let resultOfBattle = '';

  const textResult = document.querySelector('.text-result');

  function writeResultBattle() {
    textResult.innerHTML = resultOfBattle;
  }

  const audioWin = document.getElementById('audio-win');
  const audioLose = document.getElementById('audio-lose');

  function checkBattleOver() {
    if (currentHealthPlayer <= 0 || currentHealthOpponent <= 0) {
      if (currentHealthPlayer <= 0 && currentHealthOpponent <= 0) {
        currentHealthPlayer = 0;
        currentHealthOpponent = 0;

        changeVisualDamage();

        resultOfBattle = '<p class="you-won">Dead heat</p>';

        writeResultBattle();
      } else if (currentHealthPlayer <= 0) {
        currentHealthPlayer = 0;
        countLoses++;
        localStorage.setItem('countLoses', countLoses);

        changeVisualDamage();

        updateStatistic();

        resultOfBattle = '<p class="you-lost">You lost :(</p>';
        writeResultBattle();

        audioLose.currentTime = 0;
        audioLose.volume = 0.2;
        audioLose.play();
      } else {
        currentHealthOpponent = 0;

        changeVisualDamage();

        countWins++;
        localStorage.setItem('countWins', countWins);

        updateStatistic();

        resultOfBattle = '<p class="you-won">You won!</p>';
        writeResultBattle();

        audioWin.currentTime = 0;
        audioWin.volume = 0.3;
        audioWin.play();
      }

      battleResult.style.display = 'flex';
    }
  }

  checkBattleOver();

  function resetValueHealth() {
    currentHealthPlayer = player.health;
    currentHealthOpponent = currentOpponnent.health;

    localStorage.setItem('currentHealthOpponent', currentHealthOpponent);
    localStorage.setItem('currentHealthPlayer', currentHealthPlayer);

    //С
    currentHealthOpponentText.textContent = currentHealthOpponent;
    currentHealthPlayerText.textContent = currentHealthPlayer;

    innerHealthOpponent.style.width = '100%';
    innerHealthPlayer.style.width = '100%';

    allHealthOpponentText.textContent = currentOpponnent.health;
  }

  let battleLogs = JSON.parse(localStorage.getItem('battleLogs')) || [];
  const battleResultText = document.querySelector('.log-result');
  writeLogs();

  btnNewBattle.addEventListener('click', () => {
    battleLogs = [];
    localStorage.removeItem('battleLogs');
    battleResultText.innerHTML = '';
    localStorage.removeItem('IndexOfCurrentOpponent');
    resetValueHealth();
    battleResult.style.display = 'none';
    location.hash = 'profile';
  });

  const btnThrow = document.querySelector('.btn-throw');
  btnThrow.disabled = true;

  function validateCheckbox() {
    const playerAttack = document.querySelectorAll(
      'input[name="attack"]:checked'
    ).length;

    const playerDefence = document.querySelectorAll(
      'input[name="defence"]:checked'
    ).length;

    if (
      playerAttack == player.attackZones &&
      playerDefence == player.deffendZones
    ) {
      btnThrow.disabled = false;
    } else {
      btnThrow.disabled = true;
    }
  }

  document
    .querySelectorAll('input[name="attack"], input[name="defence"]')
    .forEach((a) => {
      a.addEventListener('change', validateCheckbox);
    });

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
      const p = document.createElement('p');
      p.innerHTML = event;

      battleResultText.appendChild(p);
      battleResultText.scrollTop = battleResultText.scrollHeight;
    });
  }

  /* ======================================================================== */
  btnThrow.addEventListener('click', () => {
    const audio = document.getElementById('audio');

    audio.currentTime = 0;
    audio.volume = 0.2;
    audio.play();

    playerAttack = Array.from(
      document.querySelectorAll('input[name="attack"]:checked')
    ).map((a) => a.value);

    playerDefence = Array.from(
      document.querySelectorAll('input[name="defence"]:checked')
    ).map((a) => a.value);

    function getRandomZones(zones, count) {
      const allZonesCopy = zones.concat([]);
      for (let i = zones.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allZonesCopy[i], allZonesCopy[j]] = [allZonesCopy[j], allZonesCopy[i]];
      }
      return allZonesCopy.slice(0, count);
    }

    opponentAtack = getRandomZones(allZones, currentOpponnent.attackZones);

    opponentDefense = getRandomZones(allZones, currentOpponnent.deffendZones);

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

    currentHealthOpponent -= damageToOpponent;
    currentHealthPlayer -= damageToPlayer;

    localStorage.setItem('currentHealthOpponent', currentHealthOpponent);
    localStorage.setItem('currentHealthPlayer', currentHealthPlayer);

    localStorage.setItem('IndexOfCurrentOpponent', IndexOfCurrentOpponent);

    validateCheckbox();

    changeVisualDamage();

    const allEvents = [...resultPlayer.events, ...resultOpponent.events];

    allEvents.forEach((event) => {
      const logText = battleEvent(event);

      const p = document.createElement('p');
      p.innerHTML = logText;

      battleResultText.appendChild(p);

      battleLogs.push(logText);

      localStorage.setItem('battleLogs', JSON.stringify(battleLogs));
      battleResultText.scrollTop = battleResultText.scrollHeight;
    });
    let otb = '---------------------------------------------------------------';
    const p = document.createElement('p');
    p.innerHTML = otb;
    battleResultText.appendChild(p);
    battleLogs.push(otb);

    localStorage.setItem('battleLogs', JSON.stringify(battleLogs));
    battleResultText.scrollTop = battleResultText.scrollHeight;
    checkBattleOver();
  });

  function changeVisualDamage() {
    innerHealthPlayer.style.width = `${
      (currentHealthPlayer / player.health) * 100
    }%`;

    innerHealthOpponent.style.width = `${
      (currentHealthOpponent / currentOpponnent.health) * 100
    }%`;

    currentHealthOpponentText.textContent = currentHealthOpponent;
    currentHealthPlayerText.textContent = currentHealthPlayer;
  }

  /* ====================================================================== */

  function battleEvent(event) {
    const { attacker, defender, target, blocked, crit, damage } = event;

    let attackerSpan = `<span class='attacker'>${attacker}</span>`;
    let defenderSpan = `<span class='defender'>${defender}</span>`;
    let targetSpan = `<span class='target'>${target}</span>`;
    let damageSpan = `<span class='damage'>${damage} damage</span>`;

    if (event.attacker === savedName) {
      attackerSpan = `<span class='attacker player'>${attacker}</span>`;
      damageSpan = `<span class='damage player'>${damage} damage</span>`;
    } else {
      defenderSpan = `<span class='defender player'>${defender}</span>`;
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
