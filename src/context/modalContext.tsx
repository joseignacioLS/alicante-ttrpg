import { ReactElement, createContext, useState } from "react";

interface IOutput {
  openModal: any;
  closeModal: any;
  content: ReactElement;
  show: boolean;
  canBeClosed: boolean;
}

export const modalContext = createContext<IOutput>({
  openModal: () => {},
  closeModal: () => {},
  content: <></>,
  show: false,
  canBeClosed: true,
});

export const ModalProvider = ({ children }: { children: ReactElement }) => {
  const [content, setContent] = useState<ReactElement>(<></>);
  const [show, setShow] = useState<boolean>(false);
  const [canBeClosed, setCanBeClosed] = useState<boolean>(true);

  const openModal = (newContent: ReactElement, enableClose: boolean = true) => {
    setShow(true);
    setContent(newContent);
    setCanBeClosed(enableClose);
  };

  const closeModal = (force: boolean = true) => {
    if (!canBeClosed && !force) return;
    setShow(false);
    setContent(<></>);
  };

  return (
    <modalContext.Provider
      value={{ show, content, openModal, closeModal, canBeClosed }}
    >
      {children}
    </modalContext.Provider>
  );
};
