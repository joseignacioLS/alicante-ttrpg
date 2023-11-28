import React, { ReactElement } from "react";
import styles from "./Button.module.scss";

interface IProps {
  children: ReactElement | string;
  disabled?: boolean;
  onClick?: any;
}
export const Button = ({
  children,
  disabled = false,
  onClick = () => {},
}: IProps) => {
  return (
    <button onClick={onClick} className={styles.button} disabled={disabled}>
      {children}
    </button>
  );
};
