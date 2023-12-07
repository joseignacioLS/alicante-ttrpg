import React, { useContext, useEffect, useState } from "react";
import { Button } from "./blocks/Button";
import styles from "./ManageGame.module.scss";
import {
  acceptPlayer,
  approveGame,
  getGame,
  rejectGame,
} from "@/utils/dataapi";
import { useRouter } from "next/navigation";
import CollapsableSection from "./blocks/CollapsableSection";
import { IGame } from "@/data/constants";
import { ETypes, alertContext } from "@/context/alertContext";

interface IProps {
  id: string;
}

const ManageGame = ({ id }: IProps) => {
  const router = useRouter();

  const [gameData, setGameData] = useState<IGame | undefined>(undefined);
  const { updateAlert } = useContext(alertContext);

  const handleAccept = async () => {
    approveGame(id);
    router.push("/manager");
  };

  const handleReject = async () => {
    rejectGame(id);
    router.push("/manager");
  };

  const handleAcceptPlayer = async (email: string) => {
    const response = await acceptPlayer(id, email);
    if (response.status === 200) {
      updateAlert("Jugador Aceptado", ETypes.inform);
      updateGameData();
    } else {
      updateAlert("Error", ETypes.alert);
    }
  };

  const updateGameData = async () => {
    const newGameData = await getGame(id);
    setGameData(newGameData);
  };

  useEffect(() => {
    updateGameData();
  }, [id]);

  if (!gameData) return <p>Cargando</p>;

  return (
    <>
      <h2>Publicar o Rechazar</h2>
      <section className={styles.wrapper}>
        <Button onClick={handleAccept} disabled={gameData.approved}>
          Publicar
        </Button>
        <Button onClick={handleReject} alert={true}>
          Rechazar
        </Button>
      </section>
      <CollapsableSection
        title={<h2>Lista de jugadores inscritos</h2>}
        defaultState={true}
        content={
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>Estado</td>
                <td>Nombre</td>
                <td>Email</td>
              </tr>
              {gameData.playerList.map(
                ({
                  name,
                  email,
                  approved,
                }: {
                  name: string;
                  email: string;
                  approved: boolean;
                }) => {
                  return (
                    <tr key={email}>
                      <td>
                        <Button
                          small={true}
                          disabled={approved}
                          onClick={() => handleAcceptPlayer(email)}
                        >
                          {approved ? "Aceptado" : "Aceptar"}
                        </Button>
                      </td>
                      <td>{name}</td>
                      <td>{email}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        }
      />
    </>
  );
};

export default ManageGame;
