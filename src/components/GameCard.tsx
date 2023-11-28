import { IGame } from "@/data/games";
import React from "react";
import styles from "./GameCard.module.scss";

const GameCard = ({ game }: { game: IGame }) => {
  return (
    <article key={`${game.master}+${game.name}`} className={styles.game}>
      <img src={game.image} />
      <h2>{game.name}</h2>
      <span>{game.system}</span>
      <span>{game.duration}</span>
      <span>{game.experience[0]}</span>
    </article>
  );
};

export default GameCard;
