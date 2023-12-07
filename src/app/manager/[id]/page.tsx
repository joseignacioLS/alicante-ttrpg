import GamePage from "@/components/GamePage";
import React from "react";

const Home = () => {
  return <GamePage backRoute="/manager" managerMode={true} />;
};

export default Home;
