import React from "react";
import styles from "./Select.module.scss";

interface IProps {
  label?: string;
  name: string;
  options: {
    value: string;
    text: string;
  }[];
  onChange: any;
}

const Select = ({ label, name, options, onChange }: IProps) => {
  return (
    <label className={styles.wrapper}>
      <span>{label}</span>
      <select className={styles.select} name={name} onChange={onChange}>
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
