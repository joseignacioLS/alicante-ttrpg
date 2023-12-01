
export enum EClass {
  wizard,
}

export enum ELevel {
  Level1 = 1,
  Level2 = 2,
  Level3 = 3,
  Level4 = 4,
  Level5 = 5,
  Level6 = 6,
  Level7 = 7,
  Level8 = 8,
  Level9 = 9,
  Level10 = 10,
  Level11 = 11,
  Level12 = 12,
  Level13 = 13,
  Level14 = 14,
  Level15 = 15,
  Level16 = 16,
  Level17 = 17,
  Level18 = 18,
  Level19 = 19,
  Level20 = 20,
}


export const spellSlots: {
  [id in EClass]: {
    [id in ELevel]: {
      [id: number]: number
    }
  }
} = {
  [EClass.wizard]: {
    [ELevel.Level1]: {
      1: 2,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0
    },
    [ELevel.Level2]: {
      1: 3,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0
    },
    [ELevel.Level3]: {
      1: 4,
      2: 2,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0
    },
    [ELevel.Level4]: {
      1: 4,
      2: 3,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0
    },
    [ELevel.Level5]: {
      1: 4,
      2: 3,
      3: 2,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0
    },
    [ELevel.Level6]: {
      1: 4,
      2: 3,
      3: 3,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0
    },
    [ELevel.Level7]: {
      1: 4,
      2: 3,
      3: 3,
      4: 1,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0
    },
    [ELevel.Level8]: {
      1: 4,
      2: 3,
      3: 3,
      4: 2,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0
    },
    [ELevel.Level9]: {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 1,
      6: 0,
      7: 0,
      8: 0,
      9: 0
    },
    [ELevel.Level10]: {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
      6: 0,
      7: 0,
      8: 0,
      9: 0
    },
    [ELevel.Level11]: {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
      6: 1,
      7: 0,
      8: 0,
      9: 0
    },
    [ELevel.Level12]: {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
      6: 1,
      7: 0,
      8: 0,
      9: 0
    },
    [ELevel.Level13]: {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
      6: 1,
      7: 1,
      8: 0,
      9: 0
    },
    [ELevel.Level14]: {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
      6: 1,
      7: 1,
      8: 0,
      9: 0
    },
    [ELevel.Level15]: {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
      6: 1,
      7: 1,
      8: 1,
      9: 0
    },
    [ELevel.Level16]: {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
      6: 1,
      7: 1,
      8: 1,
      9: 0
    },
    [ELevel.Level17]: {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
      6: 1,
      7: 1,
      8: 1,
      9: 1
    },
    [ELevel.Level18]: {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 3,
      6: 1,
      7: 1,
      8: 1,
      9: 1
    },
    [ELevel.Level19]: {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 3,
      6: 2,
      7: 1,
      8: 1,
      9: 1
    },
    [ELevel.Level20]: {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 3,
      6: 2,
      7: 2,
      8: 1,
      9: 1
    }
  }
}