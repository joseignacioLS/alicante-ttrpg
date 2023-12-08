import React, { useContext, useEffect } from "react";
import { Button } from "./blocks/Button";
import styles from "./ManageGame.module.scss";
import { useRouter } from "next/navigation";
import { IGame } from "@/data/constants";
import { apiContext } from "@/context/apiContext";
import { useManager } from "@/hooks/useManager";

interface IProps {
  id: string;
  gameData: IGame;
  updateGameData: any;
}

const ManageGame = ({ id, gameData, updateGameData }: IProps) => {
  const router = useRouter();

  const managerMode = useManager();

  const { approveGame, getGame, rejectGame } = useContext(apiContext);

  const handleAccept = async () => {
    approveGame(id);
    router.push("/manager");
  };

  const handleReject = async () => {
    rejectGame(id);
    router.push("/manager");
  };

  useEffect(() => {
    updateGameData();
  }, [id]);

  if (!gameData) return <p>Cargando</p>;

  return (
    <>
      {managerMode && (
        <>
          <h2>Gestión de la partida</h2>
          <h3>Publicar o elimnar partida</h3>
          <section className={styles.wrapper}>
            <Button onClick={handleAccept} disabled={gameData.approved}>
              Publicar
            </Button>
            <Button onClick={handleReject} alert={true}>
              Rechazar
            </Button>
          </section>
        </>
      )}
    </>
  );
};

export default ManageGame;
