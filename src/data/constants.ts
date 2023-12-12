export enum ESystem {
  DnD5e = "DnD5e",
  CoC7e = "CoC7e",
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

export enum EStatus {
  notStarted = "Sin Empezar",
  inProgress = "En Progreso",
  break = "En un descanso",
  ended = "Finalizada",
}

export interface IItem {
  _id: string;
  name: string;
  image: string;
}

export interface IGame extends IItem {
  master: string;
  system: ESystem;
  wantedPlayers: number;
  maxPlayers: number;
  experience: EExperience[];
  description: string[];
  duration: EDuration;
  information: string[];
  frequency: EFrequency;
  postDate: Date;
  postUpdate: Date;
  startDate: Date;
  progress: EStatus;
  approved: boolean;
  playerList: {
    name: string;
    email: string;
    approved: boolean | undefined;
  }[];
}

export interface IEvent extends IItem {
  date: Date;
  location: string;
}


export interface IGameFilters {
  system?: ESystem | "any";
  experience?: EExperience | "any";
  duration?: EDuration | "any";
  status?: string;
  progress?: EStatus | "any";
  master?: string;
  player?: string;
  approved?: boolean;
}

export const gameFilters = [
  {
    label: "Sistema",
    name: "system",
    options: [
      {
        text: "Cualquiera",
        value: "any",
      },
      ...Object.values(ESystem).map((v) => ({ text: v, value: v })),
    ],
  },
  {
    label: "Experiencia",
    name: "experience",
    options: [
      {
        text: "Cualquiera",
        value: "any",
      },
      ...Object.values(EExperience).map((v) => ({ text: v, value: v })),
    ],
  },
  {
    label: "Duración",
    name: "duration",
    options: [
      {
        text: "Cualquiera",
        value: "any",
      },
      ...Object.values(EDuration).map((v) => ({ text: v, value: v })),
    ],
  },
  {
    label: "Estado",
    name: "status",
    options: [
      {
        text: "Todas",
        value: "any",
      },
      {
        text: "Disponibles",
        value: "Disponibles",
      },
      {
        text: "Llenas",
        value: "Llenas",
      },
    ],
  },
  {
    label: "Progreso",
    name: "progress",
    options: [
      {
        text: "Cualquiera",
        value: "any",
      },
      ...Object.values(EStatus).map((v) => ({ text: v, value: v })),
    ],
  },
];