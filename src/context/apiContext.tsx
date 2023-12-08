import { ReactElement, createContext, useContext, useEffect } from "react";
import {
  ERequestMethods,
  IDefaultServerResponse,
  apiUrl,
} from "@/utils/request";
import { requestContext } from "./requestContext";
import { IGame, IGameFilters } from "@/data/constants";
import { userContext } from "./userContext";
import { ETypes, alertContext } from "./alertContext";

interface IOutput {
  login: any;
  logout: any;
  getGames: any;
  getNotApprovedGames: any;
  getGame: any;
  createGame: any;
  joinGame: any;
  approveGame: any;
  rejectGame: any;
  acceptPlayer: any;
}

export const apiContext = createContext<IOutput>({
  login: () => {},
  logout: () => {},
  getGames: () => {},
  getNotApprovedGames: () => {},
  getGame: () => {},
  createGame: () => {},
  joinGame: () => {},
  approveGame: () => {},
  rejectGame: () => {},
  acceptPlayer: () => {},
});

export const ApiProvider = ({ children }: { children: ReactElement }) => {
  const { request } = useContext(requestContext);
  const { name, email, setName, token, setEmail, setToken, setAdmin } =
    useContext(userContext);
  const { updateAlert } = useContext(alertContext);

  const login = async (name: string, password: string) => {
    const response = await request(`${apiUrl}users/login`, {
      method: ERequestMethods.POST,
      body: { name, password },
    });
    if (response.status === 200) {
      setName(name);
      setEmail(response.data.email);
      setToken(response.data.token);
      setAdmin(response.data.admin);
      updateAlert(`Login con éxito. Hola de nuevo ${name}`);
    } else {
      updateAlert("Error en el login", ETypes.alert);
    }
  };

  const logout = async () => {
    if (!name) return;
    setName(undefined);
    setEmail(undefined);
    setToken(undefined);
  };

  const getGames = async (filters: IGameFilters) => {
    const response = await request(
      `${apiUrl}games/?system=${filters.system || "any"}&experience=${
        filters.experience || "any"
      }&duration=${filters.duration || "any"}&status=${
        filters.status || "any"
      }&progress=${filters.progress || "any"}&approved=${
        filters.approved !== undefined ? filters.approved : "any"
      }`
    );
    return response.data as IGame[];
  };

  const getNotApprovedGames = async (): Promise<IGame[]> => {
    return await getGames({
      experience: "any",
      duration: "any",
      system: "any",
      status: "any",
      progress: "any",
      approved: false,
    });
  };

  const getGame = async (id: string): Promise<IGame> => {
    const response = await request(`${apiUrl}games/${id}`);
    return response.data as IGame;
  };

  const createGame = async (data: IGame): Promise<IDefaultServerResponse> => {
    const response = await request(`${apiUrl}games/new-game`, {
      method: ERequestMethods.POST,
      body: { data },
    });
    return response;
  };

  const joinGame = async (id: string): Promise<IDefaultServerResponse> => {
    const response = await request(`${apiUrl}games/join/${id}`, {
      method: ERequestMethods.POST,
      body: { name, email },
    });
    if (response.status === 200) {
      updateAlert(`¡Te hemos registrado en la partida!`, ETypes.inform);
    } else {
      updateAlert(`Lo sentimos, hay algún error con el registro`, ETypes.alert);
    }
    return response;
  };

  const approveGame = async (id: string): Promise<IDefaultServerResponse> => {
    const response = await request(`${apiUrl}games/approve/${id}`, {
      method: ERequestMethods.PUT,
      body: { name },
    });
    return response;
  };

  const rejectGame = async (id: string): Promise<IDefaultServerResponse> => {
    const response = await request(`${apiUrl}games/${id}`, {
      method: ERequestMethods.DELETE,
      body: { name },
    });
    return response;
  };

  const acceptPlayer = async (
    id: string,
    email: string
  ): Promise<IDefaultServerResponse> => {
    const response = await request(`${apiUrl}games/accept-player/${id}`, {
      method: ERequestMethods.PUT,
      body: { name, email },
    });
    return response;
  };

  return (
    <apiContext.Provider
      value={{
        login,
        logout,
        getGames,
        getGame,
        getNotApprovedGames,
        createGame,
        joinGame,
        approveGame,
        rejectGame,
        acceptPlayer,
      }}
    >
      {children}
    </apiContext.Provider>
  );
};
