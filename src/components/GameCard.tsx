import { IGame } from "@/data/games";
import React from "react";
import styles from "./GameCard.module.scss";
import Link from "next/link";

const GameCard = ({ game }: { game: IGame }) => {
  const isFull = game.currentPlayers >= game.maxPlayers;
  return (
    <Link href={`/partidas/${game.id}`}>
      <article className={`${styles.game} ${isFull && styles.full}`}>
        <img src={game.image} />
        <h2>{game.name}</h2>
        <span>{game.system}</span>
        <span>{game.duration}</span>
        <span>{game.experience[0]}</span>
      </article>
    </Link>
  );
};

export default GameCard;
