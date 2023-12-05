import React, { ReactElement } from "react";
import styles from "./Button.module.scss";

interface IProps {
  children: ReactElement | string;
  disabled?: boolean;
  onClick?: any;
  small?: boolean;
  alert?: boolean;
}
export const Button = ({
  children,
  disabled = false,
  small = false,
  onClick = () => {},
  alert = false,
}: IProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${small && styles.small} ${
        alert && styles.alert
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
