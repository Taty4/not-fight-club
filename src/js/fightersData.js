export const FIGHTERS_DATABASE = {
  boss: {
    name: "Громбосс Судьбы",

    titul: "Железное сердце",
    description:
      "Загадочная фигура, чьё появление редко предвещает что-то хорошее.",
    key: "boss",
    avatarSrc: "/avatars/boss.webp",
    imageSrc: "/sprites/boss/image.webp",
    health: 150,
    currentHealth: 150,
    attack: 2,
    defense: 3,
    crit: 10,
    damage: 25,
    widthSprite: 420,
    heightSprite: 360,
    sprites: {
      idle: {
        image: Object.assign(new Image(), {
          src: "/sprites/boss/idle.webp",
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: "/sprites/boss/running.webp",
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: "/sprites/boss/attack.webp",
        }),
        countFrames: 10,
        countColumns: 5,
      },
      dying: {
        image: Object.assign(new Image(), {
          src: "/sprites/boss/dying.webp",
        }),
        countFrames: 10,
        countColumns: 5,
      },
      hurt: {
        image: Object.assign(new Image(), {
          src: "/sprites/boss/hurt.webp",
        }),
        countFrames: 10,
        countColumns: 5,
      },
    },
    sounds: {
      hit: "../src/assets/audio/mech.mp3",
      hurt: "../src/assets/audio/dead1.mp3",
    },
  },
  giant: {
    name: "Кривозуб Шустрый",
    titul: "Железное сердце",
    description:
      "Зелёный обитатель севера, не отличающийся особой любовью к честным правилам.",
    key: "giant",
    avatarSrc: "/avatars/giant.webp",
    imageSrc: "/sprites/giant/image.webp",
    health: 90,
    currentHealth: 90,
    attack: 3,
    defense: 2,
    crit: 30,
    damage: 15,
    widthSprite: 420,
    heightSprite: 360,
    sprites: {
      idle: {
        image: Object.assign(new Image(), {
          src: "/sprites/giant/idle.webp",
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: "/sprites/giant/running.webp",
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: "/sprites/giant/attack.webp",
        }),
        countFrames: 10,
        countColumns: 5,
      },
      dying: {
        image: Object.assign(new Image(), {
          src: "/sprites/giant/dying.webp",
        }),
        countFrames: 10,
        countColumns: 5,
      },
      hurt: {
        image: Object.assign(new Image(), {
          src: "/sprites/giant/hurt.webp",
        }),
        countFrames: 10,
        countColumns: 5,
      },
    },
    sounds: {
      hit: "../src/assets/audio/bulava.mp3",
      hurt: "../src/assets/audio/giant-dead.mp3",
    },
  },
  leader: {
    name: "Брунгар Ледяной",

    titul: "Железное сердце",
    description:
      "Суровый северянин, привыкший к холоду, снегу и морским походам.",
    key: "leader",
    avatarSrc: "/avatars/leader.webp",
    imageSrc: "/sprites/leader/image.webp",
    health: 110,
    currentHealth: 110,
    attack: 2,
    defense: 2,
    crit: 25,
    damage: 20,
    widthSprite: 420,
    heightSprite: 360,
    sprites: {
      idle: {
        image: Object.assign(new Image(), {
          src: "/sprites/leader/idle.webp",
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: "/sprites/leader/running.webp",
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: "/sprites/leader/attack.webp",
        }),
        countFrames: 8,
        countColumns: 4,
      },
      dying: {
        image: Object.assign(new Image(), {
          src: "/sprites/leader/dying.webp",
        }),
        countFrames: 10,
        countColumns: 5,
      },
      hurt: {
        image: Object.assign(new Image(), {
          src: "/sprites/leader/hurt.webp",
        }),
        countFrames: 10,
        countColumns: 5,
      },
    },
    sounds: {
      hit: "../src/assets/audio/mech2.mp3",
      hurt: "../src/assets/audio/dead2.mp3",
    },
  },
  aztec: {
    name: "Тескаль Яростный",
    titul: "Железное сердце",
    description:
      "Представитель древней цивилизации, оказавшийся далеко за пределами родных земель.",
    key: "aztec",
    health: 120,
    currentHealth: 120,
    attack: 3,
    defense: 2,
    crit: 15,
    damage: 18,
    avatarSrc: "/avatars/aztec.webp",
    imageSrc: "/sprites/aztec/image.webp",
    widthSprite: 420,
    heightSprite: 360,
    sprites: {
      idle: {
        image: Object.assign(new Image(), {
          src: "/sprites/aztec/idle.webp",
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: "/sprites/aztec/running.webp",
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: "/sprites/aztec/attack.webp",
        }),
        countFrames: 8,
        countColumns: 4,
      },
      dying: {
        image: Object.assign(new Image(), {
          src: "/sprites/aztec/dying.webp",
        }),
        countFrames: 10,
        countColumns: 5,
      },
      hurt: {
        image: Object.assign(new Image(), {
          src: "/sprites/aztec/hurt.webp",
        }),
        countFrames: 10,
        countColumns: 5,
      },
    },
    sounds: {
      hit: "../src/assets/audio/hits.mp3",
      hurt: "../src/assets/audio/hurt.mp3",
    },
  },

  maya: {
    name: "Чакмо Каменный",
    titul: "Железное сердце",
    description: "Таинственный воитель из далёких земель с древней историей.",
    key: "maya",
    avatarSrc: "/avatars/maya.webp",
    imageSrc: "/sprites/maya/image.webp",
    health: 140,
    currentHealth: 140,
    attack: 2,
    defense: 3,
    crit: 10,
    damage: 22,
    widthSprite: 420,
    heightSprite: 360,
    sprites: {
      idle: {
        image: Object.assign(new Image(), {
          src: "/sprites/maya/idle.webp",
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: "/sprites/maya/running.webp",
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: "/sprites/maya/attack.webp",
        }),
        countFrames: 8,
        countColumns: 4,
      },
      dying: {
        image: Object.assign(new Image(), {
          src: "/sprites/maya/dying.webp",
        }),
        countFrames: 10,
        countColumns: 5,
      },
      hurt: {
        image: Object.assign(new Image(), {
          src: "/sprites/maya/hurt.webp",
        }),
        countFrames: 10,
        countColumns: 5,
      },
    },
    sounds: {
      hit: "../src/assets/audio/vzmaxmecha.mp3",
      hurt: "../src/assets/audio/dead1.mp3",
    },
  },
  nordic: {
    name: "Рагнарик Суровый",
    titul: "Железное сердце",
    description:
      "Житель северных земель, для которого суровый климат стал частью повседневной жизни.",
    key: "nordic",
    avatarSrc: "/avatars/nordic.webp",
    imageSrc: "/sprites/nordic/image.webp",
    health: 115,
    currentHealth: 115,
    attack: 2,
    defense: 2,
    crit: 20,
    damage: 30,
    widthSprite: 420,
    heightSprite: 360,
    sprites: {
      idle: {
        image: Object.assign(new Image(), {
          src: "/sprites/nordic/idle.webp",
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: "/sprites/nordic/running.webp",
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: "/sprites/nordic/attack.webp",
        }),
        countFrames: 8,
        countColumns: 4,
      },
      dying: {
        image: Object.assign(new Image(), {
          src: "/sprites/nordic/dying.webp",
        }),
        countFrames: 10,
        countColumns: 5,
      },
      hurt: {
        image: Object.assign(new Image(), {
          src: "/sprites/nordic/hurt.webp",
        }),
        countFrames: 10,
        countColumns: 5,
      },
    },
    sounds: {
      hit: "../src/assets/audio/vzmaxmecha.mp3",
      hurt: "../src/assets/audio/death1.mp3",
    },
  },
};
