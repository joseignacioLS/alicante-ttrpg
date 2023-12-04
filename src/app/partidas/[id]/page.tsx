"use client";

import { EExperience, IGame } from "@/data/constants";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import CollapsableSection from "@/components/CollapsableSection";
import JoinForm from "@/components/JoinForm";
import { getGame } from "@/utils/dataapi";

const Home = () => {
  const { id } = useParams();
  const router = useRouter();
  const [gameData, setGameData] = useState<IGame | undefined>(undefined);

  const getGameData = async (id: string) => {
    const retrievedGame = await getGame(id);
    if (retrievedGame === undefined) return router.push("/partidas");
    setGameData(retrievedGame);
  };

  useEffect(() => {
    if (Array.isArray(id)) return;
    getGameData(id);
  }, [id]);

  return (
    <main>
      <div className="content">
        <Link href="/partidas">Volver al listado</Link>
        {gameData && (
          <>
            <header className={styles.banner}>
              <img className={styles.background} src={gameData.image} />
              <h1 className={styles.title}>{gameData?.name}</h1>
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
                    Huecos Libres:{" "}
                    {gameData.maxPlayers - gameData.currentPlayers} /{" "}
                    {gameData.maxPlayers}
                  </span>
                </div>
              </div>
              <div>
                <h3>Experiencia Requerida</h3>
                <div className={styles.row}>
                  {Object.values(EExperience).map((xp) => {
                    const isValidXp = gameData.experience.includes(xp);
                    return (
                      <span
                        key={xp}
                        className={
                          isValidXp ? styles.validXp : styles.invalidXP
                        }
                      >
                        {xp}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div>
                <h3>Frecuencia de Juego</h3>
                <div className={styles.row}>
                  <span>{gameData.frecuency}</span>
                </div>
              </div>
            </section>
            <CollapsableSection
              title={"Solicitar Unirse"}
              defaultState={false}
              content={<JoinForm gameId={gameData.id} />}
            />
            <CollapsableSection
              title={"Descripción"}
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
              title={"Información Extra"}
              defaultState={true}
              content={
                <>
                  {gameData.information.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </>
              }
            />
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
