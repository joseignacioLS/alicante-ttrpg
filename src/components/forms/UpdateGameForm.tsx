"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "../blocks/Button";
import {
  EDuration,
  EExperience,
  EFrequency,
  ESystem,
  IGame,
} from "@/data/constants";
import Select from "../inputs/Select";
import DateInput from "../inputs/DateInput";
import Input from "../inputs/Input";
import Textarea from "../inputs/Textarea";
import Image from "../blocks/Image";
import { ETypes, alertContext } from "@/context/alertContext";
import { apiContext } from "@/context/apiContext";
import { useRouter } from "next/navigation";
import { userContext } from "@/context/userContext";

import styles from "./Form.module.scss";

const nameCheck = (value: string): boolean => {
  return value.match(/^[a-z ]+$/i) !== null;
};

const textCheck = (value: string): boolean => {
  return value.match(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9€.,!?¡¿\s\n]{0,}$/) !== null;
};

const checkFunctions: { [key: string]: (value: any) => boolean } = {
  name: nameCheck,
  description: textCheck,
  information: textCheck,
};

interface IInputs {
  name: string;
  system: ESystem;
  wantedPlayers: number;
  maxPlayers: number;
  image: string;
  experience: EExperience;
  description: string;
  duration: EDuration;
  information: string;
  frequency: EFrequency;
  startDate: Date;
}

interface IProps {
  id: string;
}

const UpdateGameForm = ({ id }: IProps) => {
  const [input, setInput] = useState<IInputs>({
    name: "",
    system: ESystem.DnD5e,
    wantedPlayers: 1,
    maxPlayers: 1,
    image: "",
    experience: EExperience.None,
    description: "",
    duration: EDuration.OneShot,
    information: "",
    frequency: EFrequency.Semanal,
    startDate: new Date(),
  });
  const { name } = useContext(userContext);
  const { getGame, updateGame } = useContext(apiContext);
  const { updateAlert } = useContext(alertContext);

  const [inputCheck, setInputCheck] = useState<any>({
    name: true,
    system: true,
    image: true,
    description: true,
    information: true,
    wantedPlayers: true,
    maxPlayers: true,
    experience: true,
    startDate: true,
    duration: true,
    frequency: true,
  });

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
    const objectToSend = { ...input, master: name } as any;
    objectToSend.description = input.description.split("\n");
    objectToSend.information = input.information.split("\n");
    const response = await updateGame(id, objectToSend as IGame);
    if (response.status === 200) {
      router.push(`/partidas/${id}`);
      setTimeout(() => {
        updateAlert("Partida edita correctamente", ETypes.inform);
      }, 100);
    } else {
      updateAlert("Ha habido un error con el registro", ETypes.alert);
    }
  };

  const initInput = async () => {
    const game = await getGame(id);
    if (!game) return;
    setInput({
      name: game.name,
      system: game.system,
      wantedPlayers: game.wantedPlayers,
      maxPlayers: game.maxPlayers,
      image: game.image,
      experience: game.experience,
      description: game.description.join("\n"),
      duration: game.duration,
      information: game.information.join("\n"),
      frequency: game.frequency,
      startDate: new Date(game.startDate),
    });
  };

  useEffect(() => {
    initInput();
  }, [id]);
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 style={{ gridArea: "tGeneral" }}>General</h2>
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
        <label style={{ gridArea: "master" }}>
          <h3>Nombre del Máster</h3>
          <Input
            value={name || ""}
            name={"master"}
            onChange={undefined}
            placeholder="Master"
            disabled={true}
          />
        </label>
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
      <h2 style={{ gridArea: "tPlayers" }}>Jugadores</h2>
      <section>
        <label style={{ gridArea: "maxPlayers" }}>
          <h3>Número total de Jugadores</h3>
          <Input
            type="number"
            value={input.maxPlayers}
            name={"maxPlayers"}
            onChange={handleChange}
          />
        </label>
        <label style={{ gridArea: "maxPlayers" }}>
          <h3>Número de jugadores buscados</h3>
          <Input
            type="number"
            value={input.wantedPlayers}
            name={"wantedPlayers"}
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
      <h2 style={{ gridArea: "tTime" }}>Horario</h2>
      <section>
        <label style={{ gridArea: "startDate" }}>
          <h3>Fecha de Inicio</h3>
          <DateInput
            name="startDate"
            value={new Date(input.startDate)}
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
      </section>
      <h2 style={{ gridArea: "tInfo" }}>Presentación</h2>
      <section>
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

      <div style={{ gridArea: "button" }}>
        <Button disabled={Object.values(inputCheck).some((v: any) => !v)}>
          Guardar
        </Button>
      </div>
    </form>
  );
};

export default UpdateGameForm;
