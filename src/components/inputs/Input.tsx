import React from "react";
import styles from "./Input.module.scss";
interface IProps {
  value: string;
  name?: string;
  type?: string;
  onChange: any;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
}
const Input = ({
  value,
  name,
  onChange,
  disabled,
  placeholder,
  error,
  type = "text",
}: IProps) => {
  return (
    <input
      className={`${styles.input} ${error && styles.error}`}
      type={type}
      name={name}
      value={value}
      min={1}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    ></input>
  );
};

export default Input;
