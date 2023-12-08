import React, { ReactElement } from "react";
import styles from "./CarouselCard.module.scss";

interface IProps {
  title: ReactElement;
  content: ReactElement;
  backgroundImage?: string;
}

const CarouselCard = ({ title, content, backgroundImage }: IProps) => {
  return (
    <article
      className={styles.card}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {title}
      {content}
    </article>
  );
};

export default CarouselCard;
