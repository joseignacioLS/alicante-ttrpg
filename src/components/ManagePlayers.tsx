import { IGame } from "@/data/constants";
import React, { useContext } from "react";
import CollapsableSection from "./blocks/CollapsableSection";
import { Button } from "./blocks/Button";
import { ETypes, alertContext } from "@/context/alertContext";
import { apiContext } from "@/context/apiContext";
import styles from "./ManagePlayers.module.scss";

interface IProps {
  gameData: IGame;
  id: string;
  updateGameData: any;
  name: string | undefined | null;
}

const ManagePlayers = ({ gameData, id, updateGameData, name }: IProps) => {
  const { updateAlert } = useContext(alertContext);

  const { acceptPlayer, rejectPlayer } = useContext(apiContext);

  const handleAcceptPlayer = async (email: string) => {
    const response = await acceptPlayer(id, email);
    if (response.status === 200) {
      updateAlert("Jugador Aceptado", ETypes.inform);
      updateGameData();
    } else {
      updateAlert("Error", ETypes.alert);
    }
  };

  const handleRejectPlayer = async (email: string) => {
    const response = await rejectPlayer(id, email);
    if (response.status === 200) {
      updateAlert("Jugador Declinado", ETypes.inform);
      updateGameData();
    } else {
      updateAlert("Error", ETypes.alert);
    }
  };

  return (
    <>
      {name !== undefined && gameData.master === name && (
        <CollapsableSection
          title={<h3>Lista de jugadores inscritos</h3>}
          defaultState={true}
          content={
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Acciones</th>
                  <th>Estado</th>
                  <th>Nombre</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {gameData.playerList.map(
                  ({
                    name,
                    email,
                    approved,
                  }: {
                    name: string;
                    email: string;
                    approved: boolean | undefined;
                  }) => {
                    let status = "Pendiente";
                    if (approved === true) {
                      status = "Aceptado";
                    } else if (approved === false) {
                      status = "Declinado";
                    }
                    return (
                      <tr key={email}>
                        <td>
                          <Button
                            small={true}
                            disabled={approved}
                            onClick={() => handleAcceptPlayer(email)}
                          >
                            Aceptar
                          </Button>
                          <Button
                            small={true}
                            disabled={approved === false}
                            onClick={() => handleRejectPlayer(email)}
                          >
                            Declinar
                          </Button>
                        </td>
                        <td>{status}</td>
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
      )}
    </>
  );
};

export default ManagePlayers;
