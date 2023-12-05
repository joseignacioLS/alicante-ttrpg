import React from "react";
import styles from "./DateInput.module.scss";

interface IProps {
  value: Date;
  onChange: any;
  name: string;
}

const DateInput = ({ value, onChange, name }: IProps) => {
  return (
    <input
      className={styles.dateInput}
      type="date"
      value={value as any}
      onChange={onChange}
      name={name}
    />
  );
};

export default DateInput;
