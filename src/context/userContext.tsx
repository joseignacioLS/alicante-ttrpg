import { ERequestMethods, apiUrl, makeRequest } from "@/utils/request";
import { ReactElement, createContext, useEffect, useState } from "react";

interface IOutput {
  name: string | undefined | null;
  setName: any;
  email: string | undefined | null;
  setEmail: any;
  token: string | undefined | null;
  setToken: any;
  admin: boolean | undefined;
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
  const [name, setName] = useState<string | undefined | null>(null);
  const [email, setEmail] = useState<string | undefined | null>(null);
  const [admin, setAdmin] = useState<boolean | undefined>(undefined);
  const [token, setToken] = useState<string | undefined | null>(null);

  const getStoredUser = async () => {
    const userData = window.localStorage.getItem("userData");
    if (!userData) return initializeData();
    const parsed = JSON.parse(userData);
    const response = await makeRequest(`${apiUrl}users/refresh`, {
      method: ERequestMethods.POST,
      body: { email: parsed.email, token: parsed.token },
    });

    if (response.status === 200) {
      console.log(response.data)
      setName(response.data.name);
      setEmail(response.data.email);
      setAdmin(response.data.admin);
      setToken(response.data.token);
    } else {
      initializeData();
    }
  };

  const initializeData = () => {
    setName(undefined);
    setEmail(undefined);
    setAdmin(false);
    setToken(undefined);
  };

  useEffect(() => {
    console.log("user context up");
    getStoredUser();
  }, []);

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
