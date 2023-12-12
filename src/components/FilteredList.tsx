"use client";

import React, { useContext, useEffect, useState } from "react";
import Filters, { IFilterOption } from "./Filters";
import CardList from "./CardList";
import Card from "./Card";
import { apiContext } from "@/context/apiContext";

interface IProps {
  filterOptions?: IFilterOption[];
  filterDefaults?: any;
  fixedFilters?: {};
  managerMode?: boolean;
}

const FilteredList = ({
  filterOptions = [],
  filterDefaults = {},
  fixedFilters = {},
  managerMode = false,
}: IProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({
    filterDefaults,
    ...fixedFilters,
  });
  const { getGames } = useContext(apiContext);
  const handleChange = (e: any) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setFilters((old: any) => {
      const newValues = { ...old, [name]: value, ...fixedFilters };
      return newValues;
    });
  };

  const getItems = async () => {
    const newList = await getGames(filters);
    setItems(newList);
  };

  useEffect(() => {
    getItems();
  }, [filters]);
  return (
    <>
      {filterOptions.length > 0 && (
        <Filters
          filterOptions={filterOptions}
          values={filters}
          handleChange={handleChange}
        />
      )}
      <CardList>
        {!items || items.length === 0 ? (
          <h3>No hay partidas con estos criterios</h3>
        ) : (
          items
            .sort((a: any, b: any) => {
              return new Date(a.postUpdate) < new Date(b.postUpdate) ? 1 : -1;
            })
            .map((item) => {
              return (
                <Card
                  key={item._id}
                  item={item}
                  href={`/${managerMode ? "manager" : "partidas"}/${item._id}`}
                />
              );
            })
        )}
      </CardList>
    </>
  );
};

export default FilteredList;
