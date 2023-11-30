"use client";

import FilteredList from "@/components/FilteredList";
import { getEvents } from "@/utils/dataapi";
import { ECardType } from "@/components/Card";

const Home = () => {
  return (
    <main>
      <div className={`content`}>
        <h1>Listado de Partidas</h1>
        <FilteredList
          filterOptions={[]}
          filterDefaults={{}}
          cardType={ECardType.event}
          getItemsFunction={getEvents}
        />
      </div>
    </main>
  );
};

export default Home;
