import React from "react";
import styles from "./Checks.module.scss";

interface IProps {
  name: string;
  values: boolean[];
  options: string[];
  keys: string[];
  onChange: any;
}

const Checks = ({ name, values, options, keys, onChange }: IProps) => {
  return (
    <div className={styles.wrapper}>
      {options.map((option, i) => {
        return (
          <label key={option} className={styles.checkWrapper}>
            <input
              type="checkbox"
              name={`${name};${keys[i]}`}
              checked={values[i]}
              onChange={onChange}
            />
            <span>{option}</span>
          </label>
        );
      })}
    </div>
  );
};

export default Checks;
