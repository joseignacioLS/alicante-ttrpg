"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./GamePage.module.scss";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { IGame } from "@/data/constants";
import { getGame } from "@/utils/dataapi";
import CollapsableSection from "./blocks/CollapsableSection";
import JoinForm from "./forms/JoinForm";
import { ETypes, alertContext } from "@/context/alertContext";
import ManageGame from "./ManageGame";
import Image from "./blocks/Image";
import Link from "next/link";
import { Button } from "./blocks/Button";

interface IProps {
  backRoute: string;
  managerMode?: boolean;
}

const GamePage = ({ backRoute, managerMode = false }: IProps) => {
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

  const ocuppedPositions: number = gameData.playerList.filter(
    (v) => v.approved
  ).length;

  console.log(gameData.playerList, ocuppedPositions);

  return (
    <>
      <section className={`wholeW ${styles.banner}`}>
        <Link href={backRoute} className={styles.back}>
          <Button small={true}>Atras</Button>
        </Link>
        <Image src={gameData.image} className={styles.background} />
        <h1 className={styles.title}>{gameData.name}</h1>
      </section>
      <h2>Información</h2>
      <section className={styles.stats}>
        <div>
          <h3>General</h3>
          <div className={styles.row}>
            <span>{gameData.master}</span>
            <span>{gameData.system}</span>
            <span>{gameData.progress}</span>{" "}
          </div>
        </div>
        <div>
          <h3>Jugadores</h3>
          <div className={styles.row}>
            <span>Jugadores Totales: {gameData.maxPlayers}</span>
            <span>
              Huecos Libres: {gameData.wantedPlayers - ocuppedPositions}
            </span>
            <span>{gameData.experience}</span>
          </div>
        </div>
        <div>
          <h3>Frecuencia de Juego</h3>
          <div className={styles.row}>
            <span>{gameData.duration}</span>
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
      {!managerMode && (
        <section id="unete">
          <h2>Unete a la partida</h2>
          <JoinForm gameId={gameData._id} />
        </section>
      )}
      {managerMode && (
        <ManageGame
          id={gameData._id}
          approved={gameData.approved}
          playerList={gameData.playerList || []}
        />
      )}
    </>
  );
};

export default GamePage;
