"use client";

import FilteredList from "@/components/FilteredList";
import useUser from "@/hooks/useUser";
import React from "react";

const Home = () => {
  useUser(true);
  return (
    <>
      <h1>Manager</h1>
      <section>
        <h2>Partidas por Aprobar</h2>
        <FilteredList fixedFilters={{ approved: false }} managerMode={true} />
      </section>
      <section>
        <h2>Partidas en marcha</h2>
        <FilteredList fixedFilters={{ approved: true }} managerMode={true} />
      </section>
    </>
  );
};

export default Home;
