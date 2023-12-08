import { ReactElement, createContext, useState } from "react";

interface IOutput {
  name: string | undefined;
  setName: any;
  token: string | undefined;
  setToken: any;
}

export const userContext = createContext<IOutput>({
  name: undefined,
  setName: () => {},
  token: undefined,
  setToken: () => {},
});

export const UserProvider = ({ children }: { children: ReactElement }) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  return (
    <userContext.Provider
      value={{
        name,
        token,
        setName,
        setToken,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
