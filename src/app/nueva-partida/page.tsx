import GamePage from "@/components/GamePage";
import NewGameForm from "@/components/forms/NewGameForm";
import React from "react";

const Home = () => {
  return (
    <>
      <h1>Nueva partida</h1>
      <section>
        <NewGameForm />
      </section>
    </>
  );
};

export default Home;
