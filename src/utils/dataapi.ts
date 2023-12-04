import { EDuration, EExperience, EStatus, ESystem, IGame } from "@/data/constants"
import { ERequestMethods, makeRequest } from "./request";
import { events } from "@/data/events";

const apiUrl = process.env.NODE_ENV === "development" ? "http://localhost:3500/" : process.env.NEXT_PUBLIC_API_URL

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

export const getGames = async (filters: IGameFilters): Promise<IGame[]> => {
  const response = await makeRequest(`${apiUrl}games/?system=${filters.system
    }&experience=${filters.experience
    }&duration=${filters.duration
    }&status=${filters.status
    }&progress=${filters.progress
    }`);
  return response.data as IGame[];
}

export const getGame = async (id: string): Promise<IGame> => {
  const response = await makeRequest(`${apiUrl}games/${id}`);
  return response.data as IGame
}

export const createGame = async (data: any): Promise<any> => {
  const response = await makeRequest(
    `${apiUrl}games/new-game`,
    {
      method: ERequestMethods.POST,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
  return response
}

export const getEvents = (filters: any): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    resolve(events)
  });
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

export const getSpellList = async () => {
  const data = await makeRequest(`https://www.dnd5eapi.co/api/spells`)
  return data
}

export const getSpellInfo = async (name: string) => {
  const data = await makeRequest(`https://www.dnd5eapi.co/api/spells/${name}`)
  return data

}