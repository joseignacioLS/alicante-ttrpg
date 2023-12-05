"use client";

import { gameFilters, getGames } from "@/utils/dataapi";
import FilteredList from "@/components/FilteredList";
import { ECardType } from "@/components/Card";

const Home = () => {
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
        }}
        cardType={ECardType.game}
        getItemsFunction={getGames}
      />
    </>
  );
};

export default Home;
