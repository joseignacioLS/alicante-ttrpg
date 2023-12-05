"use client";

import { ECardType } from "@/components/Card";
import FilteredList from "@/components/FilteredList";
import { getGames, getNotApprovedGames } from "@/utils/dataapi";
import React from "react";

const Home = () => {
  return (
    <>
      <h1>Manager</h1>
      <section>
        <h2>Partidas por Aprobar</h2>
        <FilteredList
          cardType={ECardType.management}
          getItemsFunction={getNotApprovedGames}
        />
      </section>
      <section>
        <h2>Partidas en marcha</h2>
        <FilteredList
          cardType={ECardType.management}
          getItemsFunction={getGames}
        />
      </section>
    </>
  );
};

export default Home;
