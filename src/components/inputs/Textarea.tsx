import React from "react";
import styles from "./Textarea.module.scss";

interface IProps {
  value: string;
  name: string;
  onChange: any;
  error?: boolean;
}

const Textarea = ({ value, name, error = false, onChange }: IProps) => {
  return (
    <textarea
      className={`${styles.textarea} ${error && styles.error}`}
      value={value}
      name={name}
      onChange={onChange}
    ></textarea>
  );
};

export default Textarea;
