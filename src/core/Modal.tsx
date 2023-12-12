"use client";

import { modalContext } from "@/context/modalContext";
import React, { useContext } from "react";
import styles from "./Modal.module.scss";
const Modal = () => {
  const { show, content, closeModal } = useContext(modalContext);
  return (
    <>
      {show && (
        <div className={styles.wrapper} onClick={() => closeModal(false)}>
          <div className={styles.content} onClick={(e) => e.stopPropagation()}>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
