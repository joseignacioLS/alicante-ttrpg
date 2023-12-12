"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./GamePage.module.scss";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { IGame } from "@/data/constants";
import CollapsableSection from "./blocks/CollapsableSection";
import { ETypes, alertContext } from "@/context/alertContext";
import ManageGame from "./ManageGame";
import Image from "./blocks/Image";
import Link from "next/link";
import { Button } from "./blocks/Button";
import ClickAlertItem from "./blocks/ClickAlertItem";
import { apiContext } from "@/context/apiContext";
import { userContext } from "@/context/userContext";
import UserJoinGame from "./UserJoinGame";
import ManagePlayers from "./ManagePlayers";

interface IProps {
  backRoute: string;
}

const GamePage = ({ backRoute }: IProps) => {
  const router = useRouter();
  const [gameData, setGameData] = useState<IGame | undefined>(undefined);
  const { name, admin } = useContext(userContext);
  const { updateAlert } = useContext(alertContext);
  const { getGame } = useContext(apiContext);

  const pathname = usePathname();
  const id = pathname?.split("/").at(-1);

  const managerMode = pathname?.includes("/manager/");

  const getGameData = async () => {
    const retrievedGame = await getGame(id);
    if (retrievedGame === undefined) {
      updateAlert("Partida no encontrada", ETypes.alert);
      return router.push("/partidas");
    }
    setGameData(retrievedGame);
  };

  useEffect(() => {
    if (Array.isArray(id)) return;
    getGameData();
  }, [id]);

  useEffect(() => {
    if (!managerMode) return;
    if (!gameData) return;
    if (admin) return;
    if (name !== undefined && name !== null && name !== gameData.master) return;
    router.push("/");
  }, [managerMode, name, admin, gameData]);

  if (!gameData) {
    return <p>Loading</p>;
  }

  const ocuppedPositions: number = Math.min(
    gameData.playerList.filter((v) => v.approved).length,
    gameData.wantedPlayers
  );

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
            <ClickAlertItem message="Esta persona es el máster de la pártida. Gestionará a los participantes y dirigirá la partida.">
              <span>Master: {gameData.master}</span>
            </ClickAlertItem>
            <ClickAlertItem message="Este es el sistema de juego elegido para esta partida.">
              <span>Sistema: {gameData.system}</span>
            </ClickAlertItem>
            <ClickAlertItem message="Este es el estado de la partida">
              <span>Estado: {gameData.progress}</span>
            </ClickAlertItem>
          </div>
        </div>
        <div>
          <h3>Jugadores</h3>
          <div className={styles.row}>
            <ClickAlertItem message="Este es el número máximo de jugadores que habrá en la partida.">
              <span>Plazas Totales: {gameData.maxPlayers}</span>
            </ClickAlertItem>
            <ClickAlertItem message="Este es el número de plazas disponibles.">
              <span>
                Plazas Libres: {gameData.wantedPlayers - ocuppedPositions}
              </span>
            </ClickAlertItem>
            <ClickAlertItem message="Esta es la experiencia mínima requerida para unirse a esta partida.">
              <span>Experiencia: {gameData.experience}</span>
            </ClickAlertItem>
          </div>
        </div>
        <div>
          <h3>Horario</h3>
          <div className={styles.row}>
            <ClickAlertItem message="Esta es la fecha de inicio propuesta para la partida">
              <span>
                Inicio:{" "}
                {new Date(gameData.startDate).toLocaleDateString("es-ES")}
              </span>
            </ClickAlertItem>
            <ClickAlertItem message="Esta es la duración esperada de la partida">
              <span>Duracion: {gameData.duration}</span>
            </ClickAlertItem>
            <ClickAlertItem message="Esta es la frecuencia de juego deseada">
              <span>Frecuencia: {gameData.frequency}</span>
            </ClickAlertItem>
          </div>
        </div>
      </section>
      <CollapsableSection
        title={<h2>Descripción</h2>}
        defaultState={!managerMode}
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
        defaultState={!managerMode}
        content={
          <>
            {gameData.information.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </>
        }
      />
      {!managerMode && gameData.master !== name && (
        <UserJoinGame gameData={gameData} name={name} />
      )}

      <ManagePlayers
        name={name}
        id={gameData._id}
        gameData={gameData}
        updateGameData={getGameData}
      />

      <ManageGame
        id={gameData._id}
        gameData={gameData}
        updateGameData={getGameData}
      />
    </>
  );
};

export default GamePage;
