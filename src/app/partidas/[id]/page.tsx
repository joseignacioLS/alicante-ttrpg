import React from "react";
import GamePage from "@/components/GamePage";
import { getGame } from "@/utils/dataapi";

export const generateMetadata = async ({ params }: any) => {
  const id = params.id;
  const game = await getGame(id);
  return {
    title: game?.name,
    description: game?.description,
    icons: "/placeholder.ico",
    openGraph: {
      title: game?.name,
      images: [
        {
          url: game.image,
          width: 600,
          height: 600,
        },
      ],
    },
  };
};

const Home = () => {
  return <GamePage backRoute="/partidas" />;
};

export default Home;
