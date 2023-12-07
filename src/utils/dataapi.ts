import { EDuration, EExperience, EStatus, ESystem, IGame } from "@/data/constants"
import { ERequestMethods, makeRequest } from "./request";

const apiUrl = process.env.NODE_ENV === "development" ? "http://localhost:3500/" : process.env.NEXT_PUBLIC_API_URL

export interface IGameFilters {
  system: ESystem | "any";
  experience: EExperience | "any";
  duration: EDuration | "any";
  status: string;
  progress: EStatus | "any";
  approved?: boolean;
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

interface IDefaultServerResponse {
  status: number;
  message: string;
  data: any;
}

export const getGames = async (filters: IGameFilters): Promise<IGame[]> => {
  const response = await makeRequest(`${apiUrl}games/?system=${filters.system || "any"
    }&experience=${filters.experience || "any"
    }&duration=${filters.duration || "any"
    }&status=${filters.status || "any"
    }&progress=${filters.progress || "any"
    }&approved=${filters.approved !== undefined ? filters.approved : "any"}`);
  return response.data as IGame[];
}

export const getNotApprovedGames = async (): Promise<IGame[]> => {
  return await getGames({ experience: "any", duration: "any", system: "any", status: "any", progress: "any", approved: false })
}

export const getGame = async (id: string): Promise<IGame> => {
  const response = await makeRequest(`${apiUrl}games/${id}`);
  return response.data as IGame
}

export const createGame = async (data: IGame): Promise<IDefaultServerResponse> => {
  const response = await makeRequest(
    `${apiUrl}games/new-game`,
    {
      method: ERequestMethods.POST,
      body: { data },
    })
  return response
}

export const joinGame = async (id: string, name: string, email: string): Promise<IDefaultServerResponse> => {
  const response = await makeRequest(
    `${apiUrl}games/join/${id}`,
    {
      method: ERequestMethods.POST,
      body: { name, email },
    })
  return response

}

export const approveGame = async (id: string): Promise<IDefaultServerResponse> => {
  const response = await makeRequest(
    `${apiUrl}games/approve/${id}`,
    {
      method: ERequestMethods.PUT,
    })
  return response
}


export const rejectGame = async (id: string): Promise<IDefaultServerResponse> => {
  const response = await makeRequest(
    `${apiUrl}games/${id}`,
    {
      method: ERequestMethods.DELETE,
    })
  return response
}

export const acceptPlayer = async (id: string, email: string): Promise<IDefaultServerResponse> => {
  const response = await makeRequest(`${apiUrl}games/accept-player/${id}`,
    { method: ERequestMethods.PUT, body: { email } })
  return response
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