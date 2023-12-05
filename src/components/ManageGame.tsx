import React from "react";
import { Button } from "./blocks/Button";
import styles from "./ManageGame.module.scss";
import { approveGame, rejectGame } from "@/utils/dataapi";
import { useRouter } from "next/navigation";

interface IProps {
  id: string;
}

const ManageGame = ({ id }: IProps) => {
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
    <section className={styles.wrapper}>
      <Button onClick={handleAccept}>Publicar</Button>
      <Button onClick={handleReject}>Rechazar</Button>
    </section>
  );
};

export default ManageGame;
