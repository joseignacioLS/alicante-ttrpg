import React, { ReactElement } from "react";
import styles from "./Carrousel.module.scss";

interface IProps {
  slides: { element: ReactElement; id: string }[];
}

const Carrousel = ({ slides }: IProps) => {
  return (
    <div className={styles.carrousel}>
      {slides.map((slide) => {
        return <article key={slide.id}>{slide.element}</article>;
      })}
    </div>
  );
};

export default Carrousel;
