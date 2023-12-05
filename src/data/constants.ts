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
  currentPlayers: number;
  maxPlayers: number;
  experience: EExperience[];
  description: string[];
  duration: EDuration;
  information: string[];
  frequency: EFrequency;
  postDate: Date;
  postUpdate: Date;
  startDate: Date | undefined;
  progress: EStatus;
}

export interface IEvent extends IItem {
  date: Date;
  location: string;
}
