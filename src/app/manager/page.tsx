"use client";

import FilteredList from "@/components/FilteredList";
import { useAdmin } from "@/hooks/useAdmin";
import React from "react";

const Home = () => {
  useAdmin();
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
