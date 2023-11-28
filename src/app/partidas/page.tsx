"use client";

import { EExperience, ESystem, IGame, games } from "@/data/games";
import styles from "./page.module.scss";
import GameCard from "@/components/GameCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import Select from "@/components/Select";

export default function Home() {
  const [filters, setFilters] = useState<{
    system: ESystem | "any";
    experience: EExperience | "any";
  }>({ system: "any", experience: "any" });
  const [gameList, setGameList] = useState<IGame[]>([]);

  const handleChange = (e: any) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setFilters((old) => {
      return { ...old, [name]: value };
    });
  };

  useEffect(() => {
    const filterGames = games.filter((v) => {
      const isSystem = filters.system === "any" || v.system === filters.system;
      const isExperience =
        filters.experience === "any" ||
        v.experience.includes(filters.experience);
      return isSystem && isExperience;
    }) as IGame[];
    setGameList(filterGames);
  }, [filters]);

  return (
    <main>
      <div className={`content`}>
        <h1>Listado de Partidas</h1>
        <section className={styles.filters}>
          <Select
            label="Sistema"
            name={"system"}
            onChange={handleChange}
            options={[
              {
                text: "Cualquier",
                value: "any",
              },
              ...Object.values(ESystem).map((v) => {
                return {
                  text: v,
                  value: v,
                };
              }),
            ]}
          />
          <Select
            label="Experiencia"
            name={"experience"}
            onChange={handleChange}
            options={[
              {
                text: "Cualquier",
                value: "any",
              },
              ...Object.values(EExperience).map((v) => {
                return {
                  text: v,
                  value: v,
                };
              }),
            ]}
          />
        </section>
        <section className={styles.gameList}>
          {gameList.length === 0 && (
            <h3>No hay partidas con estos criterios</h3>
          )}
          {gameList.map((game) => {
            return (
              <Link key={game.id} href={`/partidas/${game.id}`}>
                <GameCard game={game} />
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
