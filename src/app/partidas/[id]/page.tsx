"use client";

import { EExperience, IGame, games } from "@/data/games";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { Button } from "@/components/Button";

const Home = () => {
  const { id } = useParams();
  const router = useRouter();
  const [gameData, setGameData] = useState<IGame | undefined>(undefined);

  const handleJoin = () => {
    console.log(`Request Join Game ${id}`);
  };

  useEffect(() => {
    const retrievedGame = games.find((v) => v.id === id) as IGame | undefined;
    if (retrievedGame === undefined) return router.push("/partidas");
    setGameData(retrievedGame);
  }, [id]);

  return (
    <main>
      <div className="content">
        <Link href="/partidas">
          <span>Volver al listado</span>
        </Link>
        {gameData && (
          <>
            <header className={styles.banner}>
              <img className={styles.background} src={gameData.image} />
              <h1 className={styles.title}>{gameData?.name}</h1>
            </header>
            <h2>Información</h2>
            <section className={styles.stats}>
              <h3>Máster y Sistema</h3>
              <div className={styles.row}>
                <span>{gameData.master}</span>
                <span>{gameData.system}</span>
              </div>
              <h3>Duración Planificada</h3>
              <div className={styles.row}>
                <span>{gameData.duration}</span>
              </div>
              <h3>Experiencia Requerida</h3>
              <div className={styles.row}>
                {Object.values(EExperience).map((xp) => {
                  const isValidXp = gameData.experience.includes(xp);
                  return (
                    <span
                      key={xp}
                      className={isValidXp ? styles.validXp : styles.invalidXP}
                    >
                      {xp}
                    </span>
                  );
                })}
              </div>
              <h3>Espacio</h3>
              <div className={styles.row}>
                <span>
                  Huecos Libres: {gameData.maxPlayers - gameData.currentPlayers}{" "}
                  / {gameData.maxPlayers}
                </span>
              </div>
            </section>
            <h2>Descripción</h2>
            <section className={styles.description}>
              {gameData.description.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </section>
            <div className={styles.cta}>
              <Button
                onClick={handleJoin}
                disabled={gameData?.maxPlayers <= gameData?.currentPlayers}
              >
                {gameData?.maxPlayers <= gameData?.currentPlayers
                  ? "Plazas Llenas"
                  : "Solicitar Unirse"}
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
