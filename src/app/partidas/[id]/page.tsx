import React from "react";
import GamePage from "@/components/GamePage";
import { apiUrl, makeRequest } from "@/utils/request";
import { IGame } from "@/data/constants";

export const generateMetadata = async ({ params }: any) => {
  const id = params.id;
  const response = await makeRequest(`${apiUrl}games/${id}`);
  const game = response.data as IGame;

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
