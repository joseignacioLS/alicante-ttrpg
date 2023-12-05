import React from "react";
import { Button } from "./blocks/Button";
import styles from "./ManageGame.module.scss";
import { approveGame, rejectGame } from "@/utils/dataapi";
import { useRouter } from "next/navigation";
import CollapsableSection from "./blocks/CollapsableSection";

interface IProps {
  id: string;
  playerList: { name: string; email: string; approved: boolean }[];
}

const ManageGame = ({ id, playerList = [] }: IProps) => {
  const router = useRouter();
  const handleAccept = async () => {
    approveGame(id);
    router.push("/manager");
  };
  const handleReject = async () => {
    rejectGame(id);
    router.push("/manager");
  };
  return (
    <>
      <h2>Publicar o Rechazar</h2>
      <section className={styles.wrapper}>
        <Button onClick={handleAccept}>Publicar</Button>
        <Button onClick={handleReject} alert={true}>
          Rechazar
        </Button>
      </section>
      <CollapsableSection
        title={<h2>Lista de jugadores inscritos</h2>}
        content={
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>Estado</td>
                <td>Nombre</td>
                <td>Email</td>
              </tr>
              {playerList.map(
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
                        <Button small={true} disabled={approved}>
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
