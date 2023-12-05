import React, { ReactElement } from "react";
import styles from "./Button.module.scss";

interface IProps {
  children: ReactElement | string;
  disabled?: boolean;
  onClick?: any;
  small?: boolean;
}
export const Button = ({
  children,
  disabled = false,
  small = false,
  onClick = () => {},
}: IProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${small && styles.small}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
