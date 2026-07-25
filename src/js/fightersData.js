import hurt_1 from "../assets/audio/death1.mp3";
import hurt_2 from "../assets/audio/hurt.mp3";
import hurt_3 from "../assets/audio/giant-dead.mp3";
import hurt_4 from "../assets/audio/dead1.mp3";
import hurt_5 from "../assets/audio/dead2.mp3";

import hit_1 from "../assets/audio/bulava.mp3";
import hit_2 from "../assets/audio/hits.mp3";
import hit_3 from "../assets/audio/mech.mp3";
import hit_4 from "../assets/audio/mech2.mp3";
import hit_5 from "../assets/audio/vzmaxmecha.mp3";

export const FIGHTERS_DATABASE = {
  boss: {
    name: "Громбосс Судьбы",
    titul: "Слепая ярость",
    description:
      "Загадочная фигура, чьё появление редко предвещает что-то хорошее.",
    key: "boss",
    avatarSrc: `${import.meta.env.BASE_URL}avatars/boss.webp`,
    imageSrc: `${import.meta.env.BASE_URL}sprites/boss/image.webp`,
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
          src: `${import.meta.env.BASE_URL}sprites/boss/idle.webp`,
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/boss/running.webp`,
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/boss/attack.webp`,
        }),
        countFrames: 10,
        countColumns: 5,
      },
      dying: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/boss/dying.webp`,
        }),
        countFrames: 10,
        countColumns: 5,
      },
      hurt: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/boss/hurt.webp`,
        }),
        countFrames: 10,
        countColumns: 5,
      },
    },
    sounds: {
      hit: hit_1,
      hurt: hurt_1,
    },
  },
  giant: {
    name: "Кривозуб Шустрый",
    titul: "Тень безмолвия",
    description:
      "Зелёный обитатель севера, не отличающийся особой любовью к честным правилам.",
    key: "giant",
    avatarSrc: `${import.meta.env.BASE_URL}avatars/giant.webp`,
    imageSrc: `${import.meta.env.BASE_URL}sprites/giant/image.webp`,
    health: 110,
    currentHealth: 110,
    attack: 3,
    defense: 2,
    crit: 30,
    damage: 20,
    widthSprite: 420,
    heightSprite: 360,
    sprites: {
      idle: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/giant/idle.webp`,
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/giant/running.webp`,
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/giant/attack.webp`,
        }),
        countFrames: 10,
        countColumns: 5,
      },
      dying: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/giant/dying.webp`,
        }),
        countFrames: 10,
        countColumns: 5,
      },
      hurt: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/giant/hurt.webp`,
        }),
        countFrames: 10,
        countColumns: 5,
      },
    },
    sounds: {
      hit: hit_1,
      hurt: hurt_3,
    },
  },
  leader: {
    name: "Брунгар Ледяной",

    titul: "Крепость без стен",
    description:
      "Суровый северянин, привыкший к холоду, снегу и морским походам.",
    key: "leader",
    avatarSrc: `${import.meta.env.BASE_URL}avatars/leader.webp`,
    imageSrc: `${import.meta.env.BASE_URL}sprites/leader/image.webp`,
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
          src: `${import.meta.env.BASE_URL}sprites/leader/idle.webp`,
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/leader/running.webp`,
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/leader/attack.webp`,
        }),
        countFrames: 8,
        countColumns: 4,
      },
      dying: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/leader/dying.webp`,
        }),
        countFrames: 10,
        countColumns: 5,
      },
      hurt: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/leader/hurt.webp`,
        }),
        countFrames: 10,
        countColumns: 5,
      },
    },
    sounds: {
      hit: hit_2,
      hurt: hurt_2,
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
    avatarSrc: `${import.meta.env.BASE_URL}avatars/aztec.webp`,
    imageSrc: `${import.meta.env.BASE_URL}sprites/aztec/image.webp`,
    widthSprite: 420,
    heightSprite: 360,
    sprites: {
      idle: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/aztec/idle.webp`,
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/aztec/running.webp`,
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/aztec/attack.webp`,
        }),
        countFrames: 8,
        countColumns: 4,
      },
      dying: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/aztec/dying.webp`,
        }),
        countFrames: 10,
        countColumns: 5,
      },
      hurt: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/aztec/hurt.webp`,
        }),
        countFrames: 10,
        countColumns: 5,
      },
    },
    sounds: {
      hit: hit_4,
      hurt: hurt_4,
    },
  },

  maya: {
    name: "Чакмо Каменный",
    titul: "Пламя на снегу",
    description: "Таинственный воитель из далёких земель с древней историей.",
    key: "maya",
    avatarSrc: `${import.meta.env.BASE_URL}avatars/maya.webp`,
    imageSrc: `${import.meta.env.BASE_URL}sprites/maya/image.webp`,
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
          src: `${import.meta.env.BASE_URL}sprites/maya/idle.webp`,
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/maya/running.webp`,
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/maya/attack.webp`,
        }),
        countFrames: 8,
        countColumns: 4,
      },
      dying: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/maya/dying.webp`,
        }),
        countFrames: 10,
        countColumns: 5,
      },
      hurt: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/maya/hurt.webp`,
        }),
        countFrames: 10,
        countColumns: 5,
      },
    },
    sounds: {
      hit: hit_5,
      hurt: hurt_5,
    },
  },
  nordic: {
    name: "Рагнарик Суровый",
    titul: "Осколок бури",
    description:
      "Житель северных земель, для которого суровый климат стал частью повседневной жизни.",
    key: "nordic",
    avatarSrc: `${import.meta.env.BASE_URL}avatars/nordic.webp`,
    imageSrc: `${import.meta.env.BASE_URL}sprites/nordic/image.webp`,
    health: 115,
    currentHealth: 115,
    attack: 2,
    defense: 2,
    crit: 15,
    damage: 25,
    widthSprite: 420,
    heightSprite: 360,
    sprites: {
      idle: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/nordic/idle.webp`,
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/nordic/running.webp`,
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/nordic/attack.webp`,
        }),
        countFrames: 8,
        countColumns: 4,
      },
      dying: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/nordic/dying.webp`,
        }),
        countFrames: 10,
        countColumns: 5,
      },
      hurt: {
        image: Object.assign(new Image(), {
          src: `${import.meta.env.BASE_URL}sprites/nordic/hurt.webp`,
        }),
        countFrames: 10,
        countColumns: 5,
      },
    },
    sounds: {
      hit: hit_2,
      hurt: hurt_4,
    },
  },
};
