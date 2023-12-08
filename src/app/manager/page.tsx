"use client";

import FilteredList from "@/components/FilteredList";
import { apiContext } from "@/context/apiContext";
import { useAdmin } from "@/hooks/useAdmin";
import React, { useContext } from "react";

const Home = () => {
  useAdmin();
  const { getGames, getNotApprovedGames } = useContext(apiContext);
  return (
    <>
      <h1>Manager</h1>
      <section>
        <h2>Partidas por Aprobar</h2>
        <FilteredList
          getItemsFunction={getNotApprovedGames}
          managerMode={true}
        />
      </section>
      <section>
        <h2>Partidas en marcha</h2>
        <FilteredList getItemsFunction={getGames} managerMode={true} />
      </section>
    </>
  );
};

export default Home;
