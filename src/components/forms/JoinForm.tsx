import React, { useContext, useState } from "react";
import styles from "./Form.module.scss";
import { Button } from "../blocks/Button";
import { apiContext } from "@/context/apiContext";

interface IProps {
  gameId: string;
  playerList: any[];
}

const JoinForm = ({ gameId, playerList }: IProps) => {
  const [checks, setChecks] = useState<boolean>(false);

  const { joinGame } = useContext(apiContext);

  const resetForm = () => {
    setChecks(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await joinGame(gameId);
    if (response.status === 200) {
      resetForm();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        <input
          type="checkbox"
          checked={checks}
          onChange={(e: any) => {
            setChecks(e.target.checked);
          }}
        />
        <span>
          Confirmo que he leido los requisitos de la partida, y que mi
          disponibilidad y experiencia son las requeridas por la partida.
        </span>
      </label>
      <Button disabled={!checks} small={true}>
        Unirse
      </Button>
    </form>
  );
};

export default JoinForm;
