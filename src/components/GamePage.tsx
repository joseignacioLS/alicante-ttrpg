"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./GamePage.module.scss";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { IGame } from "@/data/constants";
import { getGame } from "@/utils/dataapi";
import CollapsableSection from "./CollapsableSection";
import JoinForm from "./JoinForm";
import { ETypes, alertContext } from "@/context/alertContext";

const GamePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [gameData, setGameData] = useState<IGame | undefined>(undefined);
  const { updateAlert } = useContext(alertContext);

  const getGameData = async (id: string) => {
    const retrievedGame = await getGame(id);
    if (retrievedGame === undefined) {
      updateAlert("Partida no encontrada", ETypes.alert);
      return router.push("/partidas");
    }
    setGameData(retrievedGame);
  };

  useEffect(() => {
    if (Array.isArray(id)) return;
    getGameData(id);
  }, [id]);

  if (!gameData) {
    return <p>Loading</p>;
  }

  return (
    <>
      <header className={styles.banner}>
        <img
          className={styles.background}
          src={gameData.image || "/placeholder.png"}
        />
        <h1 className={styles.title}>{gameData.name}</h1>
      </header>
      <section className={styles.stats}>
        <h2>Información</h2>
        <div>
          <h3>General</h3>
          <div className={styles.row}>
            <span>{gameData.master}</span>
            <span>{gameData.system}</span>
            <span>{gameData.duration}</span>
          </div>
        </div>
        <div>
          <h3>Estado</h3>
          <div className={styles.row}>
            <span>{gameData.progress}</span>{" "}
            <span>
              Huecos Libres: {gameData.maxPlayers - gameData.currentPlayers} /{" "}
              {gameData.maxPlayers}
            </span>
          </div>
        </div>
        <div>
          <h3>Experiencia Requerida</h3>
          <div className={styles.row}>
            <span>{gameData.experience}</span>
          </div>
        </div>
        <div>
          <h3>Frecuencia de Juego</h3>
          <div className={styles.row}>
            <span>{gameData.frequency}</span>
          </div>
        </div>
      </section>
      <CollapsableSection
        title={<h2>Descripción</h2>}
        defaultState={true}
        content={
          <>
            {gameData.description.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </>
        }
      />
      <CollapsableSection
        title={<h2>Información Extra</h2>}
        defaultState={true}
        content={
          <>
            {gameData.information.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </>
        }
      />
      <section id="unete">
        <h2>Unete a la partida</h2>
        <JoinForm gameId={gameData._id} />
      </section>
    </>
  );
};

export default GamePage;
