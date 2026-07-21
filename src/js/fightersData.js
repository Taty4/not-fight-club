export const FIGHTERS_DATABASE = {
  boss: {
    name: "Boss",
    key: "boss",
    avatarSrc: "/avatars/boss.webp",
    imageSrc: "/sprites/boss/image.webp",
    health: 120,
    currentHealth: 120,
    attack: 2,
    defense: 1,
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
    },
  },
  giant: {
    name: "Гигант",
    key: "giant",
    avatarSrc: "/avatars/giant.webp",
    imageSrc: "/sprites/giant/image.webp",
    health: 120,
    currentHealth: 120,
    attack: 2,
    defense: 1,
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
    },
  },
  leader: {
    name: "Лидер",
    key: "leader",
    avatarSrc: "/avatars/leader.webp",
    imageSrc: "/sprites/leader/image.webp",
    health: 120,
    currentHealth: 120,
    attack: 2,
    defense: 1,
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
    },
  },
  aztec: {
    name: "Ацтек",
    key: "aztec",
    health: 120,
    currentHealth: 120,
    attack: 2,
    defense: 1,
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
    },
  },

  maya: {
    name: "Mайя",
    key: "maya",
    avatarSrc: "/avatars/maya.webp",
    imageSrc: "/sprites/maya/image.webp",
    health: 120,
    currentHealth: 120,
    attack: 2,
    defense: 1,
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
    },
  },
  nordic: {
    name: "Северный",
    key: "nordic",
    avatarSrc: "/avatars/nordic.webp",
    imageSrc: "/sprites/nordic/image.webp",
    health: 120,
    currentHealth: 120,
    attack: 2,
    defense: 1,
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
    },
  },
};
