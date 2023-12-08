import { ReactElement, createContext, useState } from "react";

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
