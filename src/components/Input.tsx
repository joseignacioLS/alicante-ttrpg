import React from "react";
import styles from "./Input.module.scss";
interface IProps {
  value: string;
  name?: string;
  onChange: any;
  disabled?: boolean;
  placeholder?: string;
}
const Input = ({ value, name, onChange, disabled, placeholder }: IProps) => {
  return (
    <input
      className={styles.input}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    ></input>
  );
};

export default Input;
