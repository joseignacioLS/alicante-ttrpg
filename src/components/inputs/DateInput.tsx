import React from "react";
import styles from "./DateInput.module.scss";

interface IProps {
  value: Date;
  onChange: any;
  name: string;
  disabled?: boolean;
}

const DateInput = ({ value, onChange, name, disabled }: IProps) => {
  const year = "" + value.getUTCFullYear();
  const month = "" + value.getUTCMonth() + 1;
  const day = "" + value.getUTCDate();

  const dateValue =
    year +
    "-" +
    (month.length === 1 ? "0" : "") +
    month +
    "-" +
    (day.length === 1 ? "0" : "") +
    day;
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
