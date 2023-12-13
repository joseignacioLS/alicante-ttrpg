import React, { ReactElement } from "react";
import styles from "./Form.module.scss";

interface IProps {
  handleSubmit: any;
  children: ReactElement;
}

const Form = ({ handleSubmit, children }: IProps) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Form;
