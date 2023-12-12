import { ERequestMethods, makeRequest } from "@/utils/request";
import { ReactElement, createContext, useContext } from "react";
import { userContext } from "./userContext";

interface IOutput {
  request: any;
}

export const requestContext = createContext<IOutput>({
  request: () => {},
});

export const RequestProvider = ({ children }: { children: ReactElement }) => {
  const { name, token } = useContext(userContext);

  const request = async (
    url: string,
    {
      method,
      headers,
      body,
    }: {
      method: ERequestMethods;
      headers?: any;
      body?: any;
    } = { method: ERequestMethods.GET, body: {}, headers: {} }
  ) => {
    console.log(name, token,"lest go")
    return await makeRequest(url, {
      method,
      headers,
      body: { name, token, ...body },
    });
  };
  return (
    <requestContext.Provider value={{ request }}>
      {children}
    </requestContext.Provider>
  );
};
