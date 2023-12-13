import React, { useContext, useEffect, useState } from "react";
import CollapsableSection from "../blocks/CollapsableSection";
import Select from "../inputs/Select";
import ClickAlertItem from "../blocks/ClickAlertItem";
import DateInput from "../inputs/DateInput";
import Input from "../inputs/Input";
import {
  EDuration,
  EExperience,
  EFrequency,
  ESystem,
  IGame,
} from "@/data/constants";

import styles from "./GameInfo.module.scss";

interface IProps {
  gameData: IGame;
  edit: boolean;
  newGame?: boolean;
}

const GameInfo = ({ gameData }: IProps) => {
  const occupedPositions: number = Math.min(
    gameData.playerList.filter((v) => v.approved).length,
    gameData.wantedPlayers
  );

  return (
    <>
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
                Plazas Libres: {gameData.wantedPlayers - occupedPositions}
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
        defaultState={true}
        title={<h2>Descripción</h2>}
        content={
          <>
            {gameData.description.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </>
        }
      />
      <CollapsableSection
        defaultState={true}
        title={<h2>Información Extra</h2>}
        content={
          <>
            {gameData.information.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </>
        }
      />
    </>
  );
};

export default GameInfo;
