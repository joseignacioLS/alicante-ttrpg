import React from "react";
import styles from "./Select.module.scss";

interface IProps {
  label?: string;
  name: string;
  value: string | number;
  options: {
    value: string | number;
    text: string;
  }[];
  onChange: any;
  disabled?: boolean;
}

const Select = ({
  label,
  name,
  value,
  options,
  onChange,
  disabled,
}: IProps) => {
  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <select
        disabled={disabled}
        className={styles.select}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map(({ value, text }) => {
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default Select;
