import FilteredList from "@/components/FilteredList";
import { gameFilters } from "@/data/constants";

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
        fixedFilters={{ approved: true }}
      />
    </>
  );
};

export default Home;
