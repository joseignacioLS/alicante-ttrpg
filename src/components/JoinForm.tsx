import React, { useContext, useState } from "react";
import styles from "./JoinForm.module.scss";
import { Button } from "./Button";
import Input from "./inputs/Input";
import { ETypes, alertContext } from "@/context/alertContext";

interface IProps {
  gameId: string;
}

const JoinForm = ({ gameId }: IProps) => {
  const [input, setInput] = useState<any>({
    name: "",
    email: "",
  });

  const [checks, setChecks] = useState<boolean[]>([false, false]);

  const { updateAlert } = useContext(alertContext);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateAlert(
      `Has solicitado unirte al game:${gameId} como ${input.name} (${input.email})`,
      ETypes.inform
    );
    resetForm();
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
