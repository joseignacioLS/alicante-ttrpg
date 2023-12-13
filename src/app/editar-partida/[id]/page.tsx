"use client";

import Form from "@/components/forms/Form";
import GameForm from "@/components/forms/GameForm";
import { ETypes, alertContext } from "@/context/alertContext";
import { apiContext } from "@/context/apiContext";
import { userContext } from "@/context/userContext";
import {
  EDuration,
  EExperience,
  EFrequency,
  ESystem,
  IGame,
} from "@/data/constants";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

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

const Home = () => {
  const { id }: any = useParams();
  const router = useRouter();
  const { name } = useContext(userContext);
  const { getGame, updateGame } = useContext(apiContext);
  const { updateAlert } = useContext(alertContext);

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

  const checkProperty = async () => {
    const game = await getGame(id);
    if (name !== game.master) {
      router.push(`/partidas/${id}`);
    }
  };

  const handleSubmit = async () => {
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
    checkProperty();
    initInput();
  }, [id]);

  return (
    <>
      <h1>Editar Partida</h1>
      <section>
        <Form
          handleSubmit={(e: any) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <GameForm input={input} setInput={setInput} />
        </Form>
      </section>
    </>
  );
};

export default Home;
