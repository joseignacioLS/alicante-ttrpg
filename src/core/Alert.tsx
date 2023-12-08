"use client";

import React, { useContext, useEffect } from "react";
import styles from "./Alert.module.scss";
import { ETypes, alertContext } from "@/context/alertContext";

const styleClass = {
  [ETypes.inform]: styles.inform,
  [ETypes.alert]: styles.alert,
};

const Alert = () => {
  const { message, type, show } = useContext(alertContext);

  return (
    <div
      className={`${styles.wrapper} ${show && styles.show} ${styleClass[type]}`}
    >
      {message}
    </div>
  );
};

export default Alert;
