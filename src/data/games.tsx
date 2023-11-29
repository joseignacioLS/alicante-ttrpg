export enum ESystem {
  DnD5e = "Dungeons & Dragons 5e",
  CoC = "Call of Cthulhu 7e",
  Pathfinder = "Pathfinder",
  TenCandles = "10 Candles",
}

export enum EExperience {
  None = "Sin Experiencia",
  Iniciado = "Algo de Experiencia",
  Veterano = "Veteranos",
}

export enum EDuration {
  OneShot = "One Shot",
  ShortCampaign = "Campaña Corta",
  LongCampaign = "Campaña Larga",
}

export enum EFrequency {
  Semanal = "Semanal",
  Bisemanal = "Bisemanal",
  Mensual = "Mensual",
  Bimensual = "Bimensual",
}

export interface IGame {
  id: string;
  name: string;
  master: string;
  system: ESystem;
  image: string;
  currentPlayers: number;
  maxPlayers: number;
  experience: EExperience[];
  description: string[];
  duration: EDuration;
  information: string[];
  frecuency: EFrequency;
}

export const games = [
  {
    id: "0",
    name: "El Vórtice de Maná",
    master: "Gabriel",
    system: ESystem.DnD5e,
    image:
      "https://cdn.openart.ai/stable_diffusion/aa8f04004a467922dac32e8922cb6c91b1eff373_2000x2000.webp",
    currentPlayers: 6,
    maxPlayers: 6,
    experience: [EExperience.Iniciado, EExperience.Veterano],
    description: [
      `Un vórtice interdimensional amenaza con colapsar realidades. Mientras
          explorais tierras desconocidas y os sumergis en dimensiones paralelas,
          tendréis que desentrañar antiguos misterios, ganar aliados
          interdimensionales y evitar ser absorbidos por la caótica energía del
          vórtice de Maná.`,
      `¿Lograreis cerrar el portal antes de que todos los mundos converjan en
          un caos inimaginable?`,
      `La supervivencia de la realidad misma está en juego. ¡Prepárate para
          viajar entre dimensiones y descubrir lo que yace más allá del Vórtice!
        `,
    ],
    duration: EDuration.LongCampaign,
    information: [
      "La campaña seguirá su curso si el grupo tiene un mínimo de 5 o 6 jugadores.",
      "El recargo de la campaña tiene una devolución hasta 24 horas antes del inicio de la sesión prevista para la fecha.",
      "Si un jugador tiene un comportamiento inadecuado en la campaña (fuera o dentro de rol) en la mesa puede ser expulsado de la campaña.",
      "Puede que a lo largo de la campaña hayan otros cargos para la compra de miniaturas para ofrecer una mejor experiencia.",
    ],
    frecuency: EFrequency.Bisemanal,
  },
  {
    id: "1",
    name: "La guarida de la Bestia",
    master: "Jose",
    system: ESystem.CoC,
    image: "https://blizzardwatch.com/wp-content/uploads/2020/06/cthulhu.png",
    currentPlayers: 1,
    maxPlayers: 4,
    experience: [EExperience.None],
    description: [
      `Cuando vuestro coche dejó de funcionar en el pequeño pueblo de Tisbay pensásteis que lo más sensato era pasar la noche allí mientras os lo reparaban.`,
      `¿Pensaréis lo mismo tras ver los horrores que la noche esconde?`,
    ],
    duration: EDuration.OneShot,
    information: [],
    frecuency: EFrequency.Semanal,
  },
];
