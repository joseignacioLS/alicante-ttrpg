import { EDuration, EExperience, EStatus, ESystem } from "@/data/constants"
import { makeRequest } from "./request";
import { events } from "@/data/events";
import { games } from "@/data/games";

export interface IGameFilters {
  system: ESystem | "any";
  experience: EExperience | "any";
  duration: EDuration | "any";
  status: string;
  progress: EStatus | "any";
}

export const gameFilters = [
  {
    label: "Sistema",
    name: "system",
    options:
      [{
        text: "Cualquiera",
        value: "any"
      },
      ...Object.values(ESystem).map(v => ({ text: v, value: v }))]
  }, {
    label: "Experiencia",
    name: "experience",
    options:
      [{
        text: "Cualquiera",
        value: "any"
      },
      ...Object.values(EExperience).map(v => ({ text: v, value: v }))]
  }, {
    label: "Duración",
    name: "duration",
    options:
      [{
        text: "Cualquiera",
        value: "any"
      },
      ...Object.values(EDuration).map(v => ({ text: v, value: v }))]
  }, {
    label: "Estado",
    name: "status",
    options:
      [{
        text: "Todas",
        value: "any"
      }, {
        text: "Disponibles",
        value: "Disponibles"
      }, {
        text: "Llenas",
        value: "Llenas"
      },]
  }, {
    label: "Progreso",
    name: "progress",
    options:
      [{
        text: "Cualquiera",
        value: "any"
      },
      ...Object.values(EStatus).map(v => ({ text: v, value: v }))]
  },
]

export const getGames = (filters: IGameFilters) => {
  // const games = makeRequest("")
  return games.filter((v) => {
    const isSystem = filters.system === "any" || v.system === filters.system;
    const isExperience =
      filters.experience === "any" ||
      v.experience.includes(filters.experience);
    const isDuration =
      filters.duration === "any" || v.duration === filters.duration;
    const isFull =
      v.currentPlayers >= v.maxPlayers ? "Llenas" : "Disponibles";
    const isStatus = filters.status === "any" || isFull === filters.status;

    const isProgress =
      filters.progress === "any" || v.progress === filters.progress;
    return isSystem && isExperience && isDuration && isStatus && isProgress;
  });
}

export const getEvents = (filters: any) => {
  return events;
}

export const getClassSpellSlots = async (dndClass: string, level: number) => {
  const data = await makeRequest(`https://www.dnd5eapi.co/api/classes/${dndClass}/levels`)
  const result: any = {
    currentLevel: {},
    maxLevel: {}
  }
  const currentLevel = data.find((v: any) => v.level === level)?.spellcasting
  Object.entries(currentLevel).forEach(entry => {
    const [key, slots] = entry;
    if (key.includes("level")) {
      result.currentLevel[+key.replace("spell_slots_level_", "")] = slots
    }
  })
  const maxLevel = data.find((v: any) => v.level === 20)?.spellcasting
  Object.entries(maxLevel).forEach(entry => {
    const [key, slots] = entry;
    if (key.includes("level")) {
      result.maxLevel[+key.replace("spell_slots_level_", "")] = slots
    }
  })
  return result
}