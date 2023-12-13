import React from "react";
import styles from "./DateInput.module.scss";

interface IProps {
  value: Date;
  onChange: any;
  name: string;
  disabled?: boolean;
}

const DateInput = ({ value, onChange, name, disabled }: IProps) => {
  const dateValue = `${value.getUTCFullYear()}-${
    value.getUTCMonth() + 1
  }-${value.getUTCDate()}`;
  return (
    <input
      className={styles.dateInput}
      type="date"
      value={dateValue}
      onChange={onChange}
      name={name}
      disabled={disabled}
    />
  );
};

export default DateInput;
