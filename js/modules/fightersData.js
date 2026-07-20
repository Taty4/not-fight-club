export const FIGHTERS_DATABASE = {
  boss: {
    name: "Boss",
    key: "boss",
    avatarSrc: "./assets/avatars/boss.webp",
    health: 120,
    currentHealth: 120,
    attack: 2,
    defense: 1,
    widthSprite: 420,
    heightSprite: 360,
    sprites: {
      idle: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/boss/idle.webp",
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/boss/running.webp",
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/boss/attack.webp",
        }),
        countFrames: 10,
        countColumns: 5,
      },
    },
  },
  giant: {
    name: "Гигант",
    key: "giant",
    avatarSrc: "./assets/avatars/giant.webp",
    health: 120,
    currentHealth: 120,
    attack: 2,
    defense: 1,
    widthSprite: 420,
    heightSprite: 360,
    sprites: {
      idle: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/giant/idle.webp",
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/giant/running.webp",
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/giant/attack.webp",
        }),
        countFrames: 10,
        countColumns: 5,
      },
    },
  },
  leader: {
    name: "Лидер",
    key: "leader",
    avatarSrc: "./assets/avatars/leader.webp",
    health: 120,
    currentHealth: 120,
    attack: 2,
    defense: 1,
    widthSprite: 420,
    heightSprite: 360,
    sprites: {
      idle: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/leader/idle.webp",
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/leader/running.webp",
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/leader/attack.webp",
        }),
        countFrames: 8,
        countColumns: 4,
      },
    },
  },
  aztec: {
    name: "Ацтек",
    key: "aztec",
    health: 120,
    currentHealth: 120,
    attack: 2,
    defense: 1,
    avatarSrc: "./assets/avatars/aztec.webp",
    widthSprite: 420,
    heightSprite: 360,
    sprites: {
      idle: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/aztec/idle.webp",
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/aztec/running.webp",
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/aztec/attack.webp",
        }),
        countFrames: 8,
        countColumns: 4,
      },
    },
  },

  maya: {
    name: "Mайя",
    key: "maya",
    avatarSrc: "./assets/avatars/maya.webp",
    health: 120,
    currentHealth: 120,
    attack: 2,
    defense: 1,
    widthSprite: 420,
    heightSprite: 360,
    sprites: {
      idle: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/maya/idle.webp",
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/maya/running.webp",
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/maya/attack.webp",
        }),
        countFrames: 8,
        countColumns: 4,
      },
    },
  },
  nordic: {
    name: "Северный",
    key: "nordic",
    avatarSrc: "./assets/avatars/nordic.webp",
    health: 120,
    currentHealth: 120,
    attack: 2,
    defense: 1,
    widthSprite: 420,
    heightSprite: 360,
    sprites: {
      idle: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/nordic/idle.webp",
        }),
        countFrames: 16,
        countColumns: 4,
      },
      run: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/nordic/running.webp",
        }),
        countFrames: 12,
        countColumns: 4,
      },
      attack: {
        image: Object.assign(new Image(), {
          src: "./assets/sprites/nordic/attack.webp",
        }),
        countFrames: 8,
        countColumns: 4,
      },
    },
  },
};
