import React from "react";
import styles from "./DateInput.module.scss";

interface IProps {
  value: string;
  onChange: any;
  name: string;
}

const DateInput = ({ value, onChange, name }: IProps) => {
  return (

    <input
      className={styles.dateInput}
      type="date"
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};

export default DateInput;
