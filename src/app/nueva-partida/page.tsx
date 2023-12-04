import NewGameForm from "@/components/NewGameForm";
import React from "react";

const Home = () => {
  return (
    <main>
      <div className="content">
        <h1>Nueva partida</h1>
        <section>
          <NewGameForm />
        </section>
      </div>
    </main>
  );
};

export default Home;
