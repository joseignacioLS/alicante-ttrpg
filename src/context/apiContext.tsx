import { ReactElement, createContext, useContext } from "react";
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
  login: (name: string, password: string) => void;
  logout: () => void;
  getGames: (filter: IGameFilters) => Promise<IGame[]>;
  getGame: (id: string) => Promise<IGame>;
  createGame: (data: IGame) => Promise<IDefaultServerResponse>;
  joinGame: (id: string) => Promise<IDefaultServerResponse>;
  approveGame: (id: string) => Promise<IDefaultServerResponse>;
  rejectGame: (id: string) => Promise<IDefaultServerResponse>;
  acceptPlayer: (id: string, email: string) => Promise<IDefaultServerResponse>;
}

export const apiContext = createContext<IOutput>({
  login: (name, password) => {},
  logout: () => {},
  getGames: (filter) => new Promise((resolve, reject) => resolve([])),
  getGame: (id) => new Promise((resolve, reject) => resolve({} as IGame)),
  createGame: (data) =>
    new Promise((resolve, reject) => resolve({ status: 400 })),
  joinGame: (id) => new Promise((resolve, reject) => resolve({ status: 400 })),
  approveGame: (id) =>
    new Promise((resolve, reject) => resolve({ status: 400 })),
  rejectGame: (id) =>
    new Promise((resolve, reject) => resolve({ status: 400 })),
  acceptPlayer: (id, email) =>
    new Promise((resolve, reject) => resolve({ status: 400 })),
});

export const ApiProvider = ({ children }: { children: ReactElement }) => {
  const { request } = useContext(requestContext);
  const { name, email, setName, setEmail, setToken, setAdmin } =
    useContext(userContext);
  const { updateAlert } = useContext(alertContext);

  const handleInvalidToken = (response: IDefaultServerResponse) => {
    if (response.message === "Invalid Token") {
      logout();
    }
  };

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

      window.localStorage.setItem(
        "userData",
        JSON.stringify({
          name,
          email: response.data.email,
          admin: response.data.admin,
          token: response.data.token,
        })
      );
    } else {
      updateAlert("Error en el login", ETypes.alert);
    }
  };

  const logout = async () => {
    if (!name) return;
    setName(undefined);
    setEmail(undefined);
    setToken(undefined);
    setAdmin(undefined);
    window.localStorage.removeItem("userData");
  };

  const getGame = async (id: string): Promise<IGame> => {
    const response = await request(`${apiUrl}games/${id}`);
    return response.data as IGame;
  };

  const getGames = async (filters: IGameFilters) => {
    const response = await request(
      `${apiUrl}games/?system=${filters.system || "any"}&master=${
        filters.master || "any"
      }&player=${filters.player || "any"}&experience=${
        filters.experience || "any"
      }&duration=${filters.duration || "any"}&status=${
        filters.status || "any"
      }&progress=${filters.progress || "any"}&approved=${
        filters.approved !== undefined ? filters.approved : "any"
      }`
    );
    return response.data as IGame[];
  };

  const createGame = async (data: IGame): Promise<IDefaultServerResponse> => {
    const response = await request(`${apiUrl}games/new-game`, {
      method: ERequestMethods.POST,
      body: { data },
    });
    handleInvalidToken(response);
    return response;
  };

  const joinGame = async (id: string): Promise<IDefaultServerResponse> => {
    const response = await request(`${apiUrl}games/join/${id}`, {
      method: ERequestMethods.POST,
      body: { name, email },
    });
    handleInvalidToken(response);
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
    handleInvalidToken(response);
    return response;
  };

  const rejectGame = async (id: string): Promise<IDefaultServerResponse> => {
    const response = await request(`${apiUrl}games/${id}`, {
      method: ERequestMethods.DELETE,
      body: { name },
    });
    handleInvalidToken(response);
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
    handleInvalidToken(response);
    return response;
  };

  return (
    <apiContext.Provider
      value={{
        login,
        logout,
        getGames,
        getGame,
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
