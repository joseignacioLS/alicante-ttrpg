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

  // const login = async (name: string, password: string) => {
  //   const response = await request(`${apiUrl}users/login`, {
  //     method: ERequestMethods.POST,
  //     body: { name, password },
  //   });
  //   console.log(response)
  //   if (response.status === 200) {
  //     setName(name);
  //     setToken(response.data.token);
  //   }
  // };

  // const loggout = async () => {
  //   if (!name) return;
  //   setName(undefined);
  //   setToken(undefined);
  // };

  // useEffect(() => {
  //   login("jose", "1234");
  // }, []);

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
