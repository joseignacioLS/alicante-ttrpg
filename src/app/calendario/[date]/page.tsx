"use client";

import GameCard from "@/components/GameCard";
import { IGame, games } from "@/data/games";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Home = () => {
  const { date } = useParams();
  const [showGames, setShowGames] = useState<IGame[]>([]);

  useEffect(() => {
    if (!date || Array.isArray(date)) return;
    const checkDate = new Date(date);
    setShowGames(
      games.filter(
        (v) => v.startDate?.toDateString() === checkDate.toDateString()
      )
    );
  }, [date]);
  return (
    <main>
      <div className="content">
        <h1>Partidas para la fecha {date}</h1>
        {showGames.map((v) => {
          return <GameCard key={`${v.master}-${v.name}`} game={v} />;
        })}
      </div>
    </main>
  );
};

export default Home;
