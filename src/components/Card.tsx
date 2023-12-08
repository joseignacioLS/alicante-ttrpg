import React from "react";
import styles from "./Card.module.scss";
import Link from "next/link";
import { IGame } from "@/data/constants";
import Image from "./blocks/Image";

interface IProps {
  href?: string;
  item: IGame;
}

const Card = ({ item, href }: IProps) => {
  return (
    <Link href={href || "#"}>
      <article className={`${styles.card}`}>
        <div className={styles.image}>
          <Image src={item.image} />
        </div>
        <div className={styles.data}>
          <h2>{item.name}</h2>
          <>
            <span>{item.system}</span>
            <span>{item.duration}</span>
            <span>{item.experience}</span>
            <span>{new Date(item.startDate).toLocaleDateString("es-ES")}</span>
          </>
        </div>
      </article>
    </Link>
  );
};

export default Card;
