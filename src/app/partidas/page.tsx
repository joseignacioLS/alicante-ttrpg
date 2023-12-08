"use client";

import FilteredList from "@/components/FilteredList";
import { apiContext } from "@/context/apiContext";
import { gameFilters } from "@/data/constants";
import { useContext } from "react";

const Home = () => {
  const { getGames } = useContext(apiContext);
  return (
    <>
      <h1>Listado de Partidas</h1>
      <FilteredList
        filterOptions={gameFilters}
        filterDefaults={{
          system: "any",
          experience: "any",
          duration: "any",
          status: "any",
          progress: "any",
          approved: true,
        }}
        getItemsFunction={getGames}
      />
    </>
  );
};

export default Home;
