"use client";

import React, { useContext, useState } from "react";
import styles from "./NewGameForm.module.scss";
import Input from "../inputs/Input";
import {
  EDuration,
  EExperience,
  EFrequency,
  ESystem,
  IGame,
} from "@/data/constants";
import Select from "../inputs/Select";
import Textarea from "../inputs/Textarea";
import { Button } from "../blocks/Button";
import DateInput from "../inputs/DateInput";
import { createGame } from "@/utils/dataapi";
import { ETypes, alertContext } from "@/context/alertContext";
import Image from "../blocks/Image";
import { useRouter } from "next/navigation";

const nameCheck = (value: string): boolean => {
  return value.match(/^[a-z ]+$/i) !== null;
};

const textCheck = (value: string): boolean => {
  return value.match(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9€.,!?¡¿\s\n]{0,}$/) !== null;
};

const checkFunctions: { [key: string]: (value: any) => boolean } = {
  name: nameCheck,
  master: nameCheck,
  description: textCheck,
  information: textCheck,
};

interface IInputs {
  name: string;
  master: string;
  system: ESystem;
  maxPlayers: number;
  image: string;
  experience: EExperience;
  description: string;
  duration: EDuration;
  information: string;
  frequency: EFrequency;
  startDate: Date;
}

const NewGameForm = () => {
  const [input, setInput] = useState<IInputs>({
    name: "",
    master: "",
    system: ESystem.DnD5e,
    maxPlayers: 1,
    image: "",
    experience: EExperience.None,
    description: "",
    duration: EDuration.OneShot,
    information: "",
    frequency: EFrequency.Semanal,
    startDate: new Date(),
  });

  const [inputCheck, setInputCheck] = useState<any>({
    name: false,
    master: false,
    system: true,
    image: true,
    description: true,
    information: true,
    maxPlayers: true,
    experience: true,
    startDate: true,
    duration: true,
    frequency: true,
  });

  const { updateAlert } = useContext(alertContext);
  const router = useRouter();

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((old) => {
      return { ...old, [name]: value };
    });

    setInputCheck((old: any) => {
      return {
        ...old,
        [name]: checkFunctions[name] ? checkFunctions[name](value) : true,
      };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const objectToSend = { ...input } as any;
    objectToSend.description = input.description.split("\n");
    objectToSend.information = input.information.split("\n");
    const response = await createGame(objectToSend as IGame);
    if (response.status === 200) {
      router.push("/partidas");
      setTimeout(() => {
        updateAlert(
          "Partida registrada correctamente, te avisaremos cuando sea publicada",
          ETypes.inform
        );
      }, 100);
    } else {
      updateAlert("Ha habido un error con el registro", ETypes.alert);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 style={{ gridArea: "tGeneral" }}>General</h2>
      <section>
        <label style={{ gridArea: "name" }}>
          <h3>Nombre de la partida</h3>
          <Input
            value={input.name}
            name={"name"}
            onChange={handleChange}
            placeholder="Nombre de la partida"
            error={!inputCheck.name}
          />
        </label>
        <label style={{ gridArea: "master" }}>
          <h3>Nombre del Máster</h3>
          <Input
            value={input.master}
            name={"master"}
            onChange={handleChange}
            placeholder="Master"
            error={!inputCheck.master}
          />
        </label>
        <label style={{ gridArea: "system" }}>
          <h3>Sistema de Juego</h3>
          <Select
            name={"system"}
            value={input.system}
            options={[
              ...Object.values(ESystem).map((system) => {
                return { text: system, value: system };
              }),
            ]}
            onChange={handleChange}
          />
        </label>
      </section>
      <h2 style={{ gridArea: "tInfo" }}>Presentación</h2>
      <section>
        <label style={{ gridArea: "image" }}>
          <Image src={input.image} />
          <h3>Imagen de portada</h3>
          <Input
            value={input.image}
            name={"image"}
            onChange={handleChange}
            placeholder="URL de la imagen"
          />
        </label>
        <label style={{ gridArea: "description" }}>
          <h3>Descripción</h3>
          <Textarea
            value={input.description}
            name={"description"}
            onChange={handleChange}
            error={!inputCheck.description}
          />
        </label>
        <label style={{ gridArea: "information" }}>
          <h3>Información Extra</h3>
          <Textarea
            value={input.information}
            name={"information"}
            onChange={handleChange}
            error={!inputCheck.information}
          />
        </label>
      </section>
      <h2 style={{ gridArea: "tPlayers" }}>Jugadores</h2>
      <section>
        <label style={{ gridArea: "maxPlayers" }}>
          <h3>Número máximo de Jugadores</h3>
          <Input
            type="number"
            value={input.maxPlayers}
            name={"maxPlayers"}
            onChange={handleChange}
          />
        </label>
        <label style={{ gridArea: "experience" }}>
          <h3>Experiencia Necesaria</h3>
          <Select
            name={"experience"}
            value={input.experience}
            options={[
              ...Object.values(EExperience).map((experience) => {
                return { text: experience, value: experience };
              }),
            ]}
            onChange={handleChange}
          />
        </label>
      </section>
      <h2 style={{ gridArea: "tTime" }}>Tiempo y frecuencia</h2>
      <section>
        <label style={{ gridArea: "frequency" }}>
          <h3>Frecuencia de Juego</h3>
          <Select
            name={"frequency"}
            value={input.frequency}
            options={[
              ...Object.values(EFrequency).map((frequency) => {
                return { text: frequency, value: frequency };
              }),
            ]}
            onChange={handleChange}
          />
        </label>
        <label style={{ gridArea: "startDate" }}>
          <h3>Fecha de Inicio</h3>
          <DateInput
            name="startDate"
            value={input.startDate}
            onChange={handleChange}
          />
        </label>
        <label style={{ gridArea: "duration" }}>
          <h3>Duración de la Partida</h3>
          <Select
            name={"duration"}
            value={input.duration}
            options={[
              ...Object.values(EDuration).map((duration) => {
                return { text: duration, value: duration };
              }),
            ]}
            onChange={handleChange}
          />
        </label>
      </section>
      <div style={{ gridArea: "button" }}>
        <Button disabled={Object.values(inputCheck).some((v: any) => !v)}>
          Enviar Solicitud
        </Button>
      </div>
    </form>
  );
};

export default NewGameForm;
