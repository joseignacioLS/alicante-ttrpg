import { IGame } from "@/data/games";
import React from "react";
import styles from "./Game.module.scss";

const Game = ({ game }: { game: IGame }) => {
  return (
    <article key={`${game.master}+${game.name}`} className={styles.game}>
      <img src={game.image} />
      <h3>{game.name}</h3>
      <span>{game.master}</span>
      <span>{game.system}</span>
    </article>
  );
};

export default Game;
