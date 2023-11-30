import React, { ReactElement } from "react";
import styles from "./CardList.module.scss";

interface IProps {
  children: ReactElement | ReactElement[];
}

const CardList = ({ children }: IProps) => {
  return <section className={styles.list}>{children}</section>;
};

export default CardList;
