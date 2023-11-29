"use client";

import { EDuration, EExperience, ESystem, IGame, games } from "@/data/games";
import styles from "./page.module.scss";
import GameCard from "@/components/GameCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import Select from "@/components/Select";

export default function Home() {
  const [filters, setFilters] = useState<{
    system: ESystem | "any";
    experience: EExperience | "any";
    duration: EDuration | "any";
    status: string;
  }>({ system: "any", experience: "any", duration: "any", status: "any" });
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
      const isDuration =
        filters.duration === "any" || v.duration === filters.duration;
      const isFull =
        v.currentPlayers >= v.maxPlayers ? "Llenas" : "Disponibles";
      const isStatus = filters.status === "any" || isFull === filters.status;
      return isSystem && isExperience && isDuration && isStatus;
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
                text: "Cualquiera",
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
                text: "Cualquiera",
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
          <Select
            label="Duración"
            name={"duration"}
            onChange={handleChange}
            options={[
              {
                text: "Cualquiera",
                value: "any",
              },
              ...Object.values(EDuration).map((v) => {
                return {
                  text: v,
                  value: v,
                };
              }),
            ]}
          />
          <Select
            label="Estado"
            name={"status"}
            onChange={handleChange}
            options={[
              {
                text: "Todas",
                value: "any",
              },
              ...["Disponibles", "Llenas"].map((v) => {
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
