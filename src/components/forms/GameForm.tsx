"use client";

import React, { useContext, useState } from "react";
import { Button } from "../blocks/Button";
import { EDuration, EExperience, EFrequency, ESystem } from "@/data/constants";
import Select from "../inputs/Select";
import DateInput from "../inputs/DateInput";
import Input from "../inputs/Input";
import Textarea from "../inputs/Textarea";
import Image from "../blocks/Image";
import { userContext } from "@/context/userContext";

const nameCheck = (value: string): boolean => {
  return value.match(/^[a-z ]+$/i) !== null;
};

const textCheck = (value: string): boolean => {
  return value.match(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9€.,!?¡¿\s\n]{0,}$/) !== null;
};

const valueCheck = (value: number): boolean => {
  return value > 0;
};

const checkFunctions: { [key: string]: (value: any) => boolean } = {
  name: nameCheck,
  description: textCheck,
  information: textCheck,
  maxPlayers: valueCheck,
  wantedPlayers: valueCheck,
};

interface IProps {
  input: any;
  setInput: any;
}

const GameForm = ({ input, setInput }: IProps) => {
  const { name } = useContext(userContext);

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

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((old: any) => {
      return { ...old, [name]: value };
    });

    setInputCheck((old: any) => {
      return {
        ...old,
        [name]: checkFunctions[name] ? checkFunctions[name](value) : true,
      };
    });
  };

  if (!input?.name === undefined) {
    return <p>Cargando</p>;
  }

  return (
    <>
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
            error={!inputCheck.maxPlayers}
          />
        </label>
        <label style={{ gridArea: "maxPlayers" }}>
          <h3>Número de jugadores buscados</h3>
          <Input
            type="number"
            value={input.wantedPlayers}
            name={"wantedPlayers"}
            onChange={handleChange}
            error={!inputCheck.wantedPlayers}
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
    </>
  );
};

export default GameForm;
