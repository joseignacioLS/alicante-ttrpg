import GamePage from "@/components/GamePage";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      <Link href="/manager">Volver al listado</Link>
      <GamePage managerMode={true} />
    </>
  );
};

export default Home;
