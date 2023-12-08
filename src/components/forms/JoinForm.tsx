import React, { useContext, useState } from "react";
import styles from "./JoinForm.module.scss";
import { Button } from "../blocks/Button";
import Input from "../inputs/Input";
import { ETypes, alertContext } from "@/context/alertContext";
import { apiContext } from "@/context/apiContext";

interface IProps {
  gameId: string;
  playerList: any[];
}

const JoinForm = ({ gameId, playerList }: IProps) => {
  const [input, setInput] = useState<any>({
    name: "",
    email: "",
  });

  const [checks, setChecks] = useState<boolean[]>([false, false]);

  const { updateAlert } = useContext(alertContext);

  const { joinGame } = useContext(apiContext);

  const handleInput = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((old: any) => {
      const newValues = { ...old, [name]: value };
      checkInputs(newValues);
      return newValues;
    });
  };

  const checkInputs = (inputs: any) => {
    const nameCheck = inputs.name.match(/^[A-Záéíóúüï ]{4,}$/i) !== null;
    const emailCheck =
      inputs.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i) !== null;
    setChecks((old) => {
      return [old[0], nameCheck && emailCheck];
    });
  };

  const resetForm = () => {
    setInput({ name: "", email: "" });
    setChecks([false, false]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const joinedEmails = playerList.map((v) => v.email);
    const isAlreadyRegistered = joinedEmails.includes(input.email);
    if (isAlreadyRegistered) {
      updateAlert(`Este email ya ha sido registrado`, ETypes.alert);
      setChecks((old) => {
        return [old[0], false];
      });
      return;
    }
    const response = await joinGame(gameId, input.name, input.email);
    if (response.status === 200) {
      updateAlert(`¡Te hemos registrado en la partida!`, ETypes.inform);
      resetForm();
    } else {
      updateAlert(`Lo sentimos, hay algún error con el registro`, ETypes.alert);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        value={input.name}
        name={"name"}
        onChange={handleInput}
        placeholder="Nombre"
      />
      <Input
        value={input.email}
        name={"email"}
        onChange={handleInput}
        placeholder="Email"
      />
      <label>
        <input
          type="checkbox"
          checked={checks[0]}
          onChange={(e: any) => {
            setChecks((old) => {
              return [e.target.checked, old[1]];
            });
          }}
        />
        <span>
          Confirmo que he leido los requisitos de la partida, y que mi
          disponibilidad y experiencia son las requeridas por la partida.
        </span>
      </label>
      <Button disabled={checks.some((v) => !v)} small={true}>
        Unirse
      </Button>
    </form>
  );
};

export default JoinForm;
