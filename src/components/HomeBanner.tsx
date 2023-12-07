"use client";

import React from "react";
import Image from "./blocks/Image";

import styles from "./HomeBanner.module.scss";

const HomeBanner = () => {
  return (
    <section className={styles.wrapper}>
      <Image src="/placeholder.png" />
      <h1>Alicante TTRPG</h1>
    </section>
  );
};

export default HomeBanner;
