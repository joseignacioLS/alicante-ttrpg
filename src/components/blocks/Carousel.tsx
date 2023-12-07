"use client";

import React, { ReactElement, useRef, useState } from "react";
import styles from "./Carousel.module.scss";
import { Button } from "./Button";

interface IProps {
  slides: ReactElement[];
}

const Carousel = ({ slides }: IProps) => {
  const carouselRef = useRef(null);

  const updateSlider = (delta: 1 | -1) => {
    const carouselEle = carouselRef.current as any;
    if (!carouselEle) return;
    const carouselWidth = carouselEle.offsetWidth;
    const currentSlide = Math.floor(carouselEle.scrollLeft / carouselWidth);
    let newSlide = currentSlide + delta;
    if (newSlide < 0) {
      newSlide += slides.length;
    }
    if (newSlide >= slides.length) {
      newSlide -= slides.length;
    }
    updateCarouselScroll(newSlide);
  };

  const updateCarouselScroll = (slide: number) => {
    const carouselEle = carouselRef.current as any;
    if (!carouselEle) return;
    const carouselWidth = carouselEle.offsetWidth;
    carouselEle.scrollTo({
      left: carouselWidth * slide,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.carrousel} ref={carouselRef}>
        {slides}
        <div className={`${styles.btn} ${styles.left}`}>
          <Button small={true} onClick={() => updateSlider(-1)}>
            {"<"}
          </Button>
        </div>
        <div className={`${styles.btn} ${styles.right}`}>
          <Button small={true} onClick={() => updateSlider(1)}>
            {">"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
