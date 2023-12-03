import React, { useState } from "react";
import styles from "./JoinForm.module.scss";
import { Button } from "./Button";
import Input from "./Input";

interface IProps {
  gameId: string;
}

const JoinForm = ({ gameId }: IProps) => {
  const [input, setInput] = useState<any>({
    name: "",
    email: "",
  });

  const [checks, setChecks] = useState<boolean[]>([false, false]);

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
    const nameCheck = inputs.name.match(/^[A-Záéíóúüï ]{4,}$/i);
    const emailCheck = inputs.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i);
    setChecks((old) => {
      return [old[1], nameCheck && emailCheck];
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(
      `User ${input.name} (${input.email}) request joining game ${gameId}`
    );
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
