import React, { useContext, useEffect } from "react";
import { Button } from "../blocks/Button";
import styles from "./ManageGame.module.scss";
import { useRouter } from "next/navigation";
import { IGame } from "@/data/constants";
import { apiContext } from "@/context/apiContext";
import useUser from "@/hooks/useUser";

interface IProps {
  id: string;
  gameData: IGame;
  updateGameData: any;
}

const ManageGame = ({ id, gameData, updateGameData }: IProps) => {
  const router = useRouter();

  const { isManager } = useUser();

  const { approveGame, rejectGame } = useContext(apiContext);

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
      {isManager && (
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
