import React, { useContext, useState } from "react";

import styles from "./LoginForm.module.scss";
import Input from "../inputs/Input";
import { Button } from "../blocks/Button";
import { apiContext } from "@/context/apiContext";

interface IProps {
  callback?: any;
}

const LoginForm = ({ callback = () => {} }: IProps) => {
  const [input, setInput] = useState<any>({
    name: "",
    password: "",
  });

  const { login } = useContext(apiContext);

  const handleInput = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput((old: any) => {
      return { ...old, [name]: value };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    login(input.name, input.password);
    callback();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        value={input.name}
        name="name"
        onChange={handleInput}
        placeholder="Usuario"
      ></Input>
      <Input
        placeholder="Contraseña"
        value={input.password}
        name="password"
        type="password"
        onChange={handleInput}
      ></Input>
      <Button small={true}>Login</Button>
    </form>
  );
};

export default LoginForm;
