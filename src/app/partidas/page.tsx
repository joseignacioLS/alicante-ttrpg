"use client";

import { gameFilters, getGames } from "@/utils/dataapi";
import FilteredList from "@/components/FilteredList";
import { ECardType } from "@/components/Card";

export const Home = () => {
  return (
    <main>
      <div className={`content`}>
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
      </div>
    </main>
  );
};

export default Home;
