"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./GamePage.module.scss";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { IGame } from "@/data/constants";
import { ETypes, alertContext } from "@/context/alertContext";
import ManageGame from "./ManageGame";
import Image from "./blocks/Image";
import Link from "next/link";
import { Button } from "./blocks/Button";
import { apiContext } from "@/context/apiContext";
import { userContext } from "@/context/userContext";
import UserJoinGame from "./UserJoinGame";
import ManagePlayers from "./ManagePlayers";
import GameInfo from "./games/GameInfo";
import useProperty from "@/hooks/useProperty";

interface IProps {
  backRoute: string;
}

const GamePage = ({ backRoute }: IProps) => {
  const router = useRouter();
  const [gameData, setGameData] = useState<IGame | undefined>(undefined);
  const { name, admin } = useContext(userContext);
  const { updateAlert } = useContext(alertContext);
  const { getGame } = useContext(apiContext);
  const isProperty = useProperty(gameData?.master || "");

  const pathname = usePathname();
  const id = pathname?.split("/").at(-1);

  const managerMode = pathname?.includes("/manager/");

  const getGameData = async () => {
    if (!id) return;
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

  return (
    <>
      <section className={`wholeW ${styles.banner}`}>
        <Link href={backRoute} className={styles.back}>
          <Button small={true}>Atras</Button>
        </Link>
        <Image src={gameData.image} className={styles.background} />
        <h1 className={styles.title}>{gameData.name}</h1>
      </section>
      <GameInfo gameData={gameData} edit={true} />
      {isProperty && (
        <Link href={`/editar-partida/${gameData._id}`}>
          <Button>Editar</Button>
        </Link>
      )}
      {!isProperty && <UserJoinGame gameData={gameData} name={name} />}

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
