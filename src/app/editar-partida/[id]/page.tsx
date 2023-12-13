"use client";

import UpdateGameForm from "@/components/forms/UpdateGameForm";
import { apiContext } from "@/context/apiContext";
import { userContext } from "@/context/userContext";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const Home = () => {
  const { id }: any = useParams();
  const router = useRouter();
  const { name } = useContext(userContext);
  const { getGame } = useContext(apiContext);

  const checkProperty = async () => {
    const game = await getGame(id);
    if (name !== game.master) {
      router.push(`/partidas/${id}`);
    }
  };

  useEffect(() => {
    checkProperty();
  }, [id]);
  
  return (
    <>
      <h1>Editar Partida</h1>
      <section>
        <UpdateGameForm id={id} />
      </section>
    </>
  );
};

export default Home;
