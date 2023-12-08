import { ReactElement, createContext, useState } from "react";

interface IOutput {
  openModal: any;
  closeModal: any;
  content: ReactElement;
  show: boolean;
}

export const modalContext = createContext<IOutput>({
  openModal: () => {},
  closeModal: () => {},
  content: <></>,
  show: false,
});

export const ModalProvider = ({ children }: { children: ReactElement }) => {
  const [content, setContent] = useState<ReactElement>(<></>);
  const [show, setShow] = useState<boolean>(false);

  const openModal = (newContent: ReactElement) => {
    setShow(true);
    setContent(newContent);
  };

  const closeModal = () => {
    setShow(false);
    setContent(<></>);
  };

  return (
    <modalContext.Provider value={{ show, content, openModal, closeModal }}>
      {children}
    </modalContext.Provider>
  );
};
