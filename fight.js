document.addEventListener("DOMContentLoaded", function () {
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

  const player = {
    /*    name: "Snow Maiden", */
    /*  health: "150", */
    damage: 10,
    critChance: 0.1,
    critCoefficient: 1.5,
    attackZones: 2,
    deffendZones: 1,
    /*  src: "./assets/main-character/снегурка.jpg",
     alt: "Opponent snow maiden", */
  };

  const allZones = ["head", "neck", "body", "belly", "legs"];

  const playerAttack = Array.from(
    document.querySelectorAll("input[name='attack']:checked")
  ).map((a) => a.value);

  const playerDefence = Array.from(
    document.querySelectorAll("input[name='defence']:checked")
  ).map((a) => a.value);

  const btnThrow = document.querySelectorAll(".btn-throw");

  // Блокирую кнопку если выбрано неверное количество зон
  if (
    playerAttack.length === player.attackZones &&
    playerDefence.length === player.deffendZones
  ) {
    btnThrow.disabled = "false";
  } else btnThrow.disabled = "true";

  const arrayOfOpponents = [penguin, deer, snowMaiden];

  /* Мешаем массив с зонами */

  function getRandomZones(zones, count) {
    const allZonesCopy = zones.concat([]);
    for (let i = zones.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allZonesCopy[i], allZonesCopy[j]] = [allZonesCopy[j], allZonesCopy[i]];
    }
    return allZonesCopy.slice(0, count);
  }

  /* Сохраняю в переменные результаты атак и защит зон противника */

  const opponentAtack = getRandomZones(
    allZones,
    arrayOfOpponents[0].attackZones
  );

  const opponentDefense = getRandomZones(
    allZones,
    arrayOfOpponents[0].deffendZones
  );

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
  );

  console.log(battleLog);

  /* ==========Мешаем массив================= */
});
