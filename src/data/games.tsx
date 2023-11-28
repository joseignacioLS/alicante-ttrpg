import { ReactElement } from "react";

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

export interface IGame {
  id: string;
  name: string;
  master: string;
  system: ESystem;
  image: string;
  currentPlayers: number;
  maxPlayers: number;
  experience: EExperience[];
  description: ReactElement | string;
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
    description: (
      <>
        <p>
          Un vórtice interdimensional amenaza con colapsar realidades.Mientras
          explorais tierras desconocidas y os sumergis en dimensiones paralelas,
          tendréis que desentrañar antiguos misterios, ganar aliados
          interdimensionales y evitar ser absorbidos por la caótica energía del
          vórtice de Maná.
        </p>
        <p>
          ¿Lograreis cerrar el portal antes de que todos los mundos converjan en
          un caos inimaginable?
        </p>
        <p>
          La supervivencia de la realidad misma está en juego. ¡Prepárate para
          viajar entre dimensiones y descubrir lo que yace más allá del Vórtice!
        </p>
      </>
    ),
  },
];