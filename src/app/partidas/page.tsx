"use client";

import {
  EDuration,
  EExperience,
  EStatus,
  ESystem,
  IGame,
  games,
} from "@/data/games";
import styles from "./page.module.scss";
import GameCard from "@/components/GameCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import Select from "@/components/Select";
import { Button } from "@/components/Button";

export default function Home() {
  const [filters, setFilters] = useState<{
    system: ESystem | "any";
    experience: EExperience | "any";
    duration: EDuration | "any";
    status: string;
    progress: EStatus | "any";
  }>({
    system: "any",
    experience: "any",
    duration: "any",
    status: "any",
    progress: "any",
  });
  const [gameList, setGameList] = useState<IGame[]>([]);
  const [showFilters, setShowFilters] = useState(false);

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

      const isProgress =
        filters.progress === "any" || v.progress === filters.progress;
      return isSystem && isExperience && isDuration && isStatus && isProgress;
    }) as IGame[];
    setGameList(filterGames);
  }, [filters]);

  return (
    <main>
      <div className={`content`}>
        <h1>Listado de Partidas</h1>
        <section
          className={`${styles.filters} ${showFilters && styles.showFilters}`}
        >
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
          <Select
            label="Progreso"
            name={"progress"}
            onChange={handleChange}
            options={[
              {
                text: "Cualquiera",
                value: "any",
              },
              ...Object.values(EStatus).map((v) => {
                return {
                  text: v,
                  value: v,
                };
              }),
            ]}
          />
          <div style={{ width: "100%" }}>
            <Button onClick={() => setShowFilters((v) => !v)}>
              {showFilters ? "Esconder filtros" : "Mostrar filtros"}
            </Button>
          </div>
        </section>
        <section className={styles.gameList}>
          {gameList.length === 0 && (
            <h3>No hay partidas con estos criterios</h3>
          )}
          {gameList
            .sort((a, b) => {
              return a.postUpdate < b.postUpdate ? 1 : -1;
            })
            .map((game) => {
              return <GameCard key={game.id} game={game} />;
            })}
        </section>
      </div>
    </main>
  );
}
