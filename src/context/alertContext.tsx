import { ReactElement, createContext, useState } from "react";

export enum ETypes {
  inform,
  alert,
}

interface IOutput {
  message: string;
  type: ETypes;
  show: boolean;
  updateAlert: (message: string, type: ETypes) => void;
}

export const alertContext = createContext<IOutput>({
  message: "",
  type: ETypes.inform,
  show: false,
  updateAlert: () => {},
});

export const AlertProvider = ({ children }: { children: ReactElement }) => {
  const [messageData, setMessageData] = useState<{
    message: string;
    type: ETypes;
    show: boolean;
  }>({
    message: "",
    type: ETypes.inform,
    show: false,
  });

  const [alertTimeout, setAlertTimeout] = useState<any>(undefined);

  const updateAlert = (message: string, type: ETypes) => {
    setMessageData({ message, type, show: true });
    if (alertTimeout) clearTimeout(alertTimeout);
    const timeout = setTimeout(() => {
      setMessageData((old) => {
        return { ...old, show: false };
      });
    }, 3000);
    setAlertTimeout(timeout);
  };

  return (
    <alertContext.Provider
      value={{
        message: messageData.message,
        type: messageData.type,
        show: messageData.show,
        updateAlert,
      }}
    >
      {children}
    </alertContext.Provider>
  );
};
