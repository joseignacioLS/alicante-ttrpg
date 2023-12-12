import { ERequestMethods, apiUrl, makeRequest } from "@/utils/request";
import { ReactElement, createContext, useEffect, useState } from "react";

interface IOutput {
  name: string | undefined;
  setName: any;
  email: string | undefined;
  setEmail: any;
  token: string | undefined;
  setToken: any;
  admin: boolean;
  setAdmin: any;
}

export const userContext = createContext<IOutput>({
  name: undefined,
  setName: () => {},
  email: undefined,
  setEmail: () => {},
  token: undefined,
  setToken: () => {},
  admin: false,
  setAdmin: () => {},
});

export const UserProvider = ({ children }: { children: ReactElement }) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [admin, setAdmin] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  const getStoredUser = async () => {
    const userData = window.localStorage.getItem("userData");
    if (!userData) return;
    const parsed = JSON.parse(userData);
    const response = await makeRequest(`${apiUrl}users/refresh`, {
      method: ERequestMethods.POST,
      body: { email: parsed.email, token: parsed.token },
    });

    if (response.status === 200) {
      setName(response.data.name);
      setEmail(response.data.email);
      setAdmin(response.data.admin);
      setToken(response.data.token);
    }
  };

  useEffect(() => {
    getStoredUser();
  }, []);
  useEffect(() => {
    window.localStorage.setItem(
      "userData",
      JSON.stringify({ name, email, admin, token })
    );
  }, [name, email, admin, token]);

  return (
    <userContext.Provider
      value={{
        name,
        email,
        token,
        admin,
        setName,
        setEmail,
        setToken,
        setAdmin,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
