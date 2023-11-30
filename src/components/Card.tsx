import React from "react";
import styles from "./Card.module.scss";
import Link from "next/link";
import { EDuration, EExperience, ESystem } from "@/data/constants";

interface IProps {
  href?: string;
  item: {
    id: string;
    image: string;
    name: string;
    system?: ESystem;
    duration?: EDuration;
    experience?: EExperience[];
    date?: Date;
    location?: string;
  };
  cardType: ECardType;
}

export enum ECardType {
  game = "partidas",
  event = "eventos",
}

const Card = ({ item, href, cardType }: IProps) => {
  return (
    <Link href={href || "#"}>
      <article className={`${styles.card}`}>
        <img src={item.image} />
        <h2>{item.name}</h2>
        {cardType === ECardType.game && (
          <>
            <span>{item.system}</span>
            <span>{item.duration}</span>
            <span>{item.experience?.[0]}</span>
          </>
        )}
        {cardType === ECardType.event && (
          <>
            <span>{item.date?.toDateString()}</span>
            <span>{item.location}</span>
          </>
        )}
      </article>
    </Link>
  );
};

export default Card;
