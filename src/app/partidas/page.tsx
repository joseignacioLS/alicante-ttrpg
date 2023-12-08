"use client";

import FilteredList from "@/components/FilteredList";
import { apiContext } from "@/context/apiContext";
import { userContext } from "@/context/userContext";
import { gameFilters } from "@/data/constants";
import Link from "next/link";
import { useContext } from "react";

const Home = () => {
  const { getGames } = useContext(apiContext);
  const { admin } = useContext(userContext);
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
      {admin && <Link href="/manager">Manager Mode</Link>}
    </>
  );
};

export default Home;
