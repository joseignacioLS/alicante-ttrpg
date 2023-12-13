"use client";

import Form from "@/components/forms/Form";
import GameForm from "@/components/forms/GameForm";
import { ETypes, alertContext } from "@/context/alertContext";
import { apiContext } from "@/context/apiContext";
import {
  EDuration,
  EExperience,
  EFrequency,
  ESystem,
  IGame,
} from "@/data/constants";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

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
  const router = useRouter();

  const { createGame } = useContext(apiContext);
  const { updateAlert } = useContext(alertContext);

  const handleSubmit = async () => {
    const objectToSend = { ...input, master: name } as any;
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
    <>
      <h1>Nueva partida</h1>
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
