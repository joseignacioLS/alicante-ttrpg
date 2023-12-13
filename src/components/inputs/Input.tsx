import React from "react";
import styles from "./Input.module.scss";
interface IProps {
  value: string | number;
  name?: string;
  type?: string;
  onChange: any;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  naked?: boolean;
}
const Input = ({
  value,
  name,
  onChange,
  disabled,
  placeholder,
  error,
  type = "text",
  naked = false,
}: IProps) => {
  return (
    <input
      className={`${styles.input} ${error && styles.error} ${
        naked && styles.naked
      }`}
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
