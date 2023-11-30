import React, { useState } from "react";
import styles from "./Filters.module.scss";
import Select from "./Select";
import { Button } from "./Button";

interface IProps {
  filterOptions: IFilterOption[];
  handleChange: (e: any) => void;
}

export interface IFilterOption {
  label: string;
  name: string;
  options: {
    text: string;
    value: string;
  }[];
}

const Filters = ({ filterOptions, handleChange }: IProps) => {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <section
      className={`${styles.filters} ${showFilters && styles.showFilters}`}
    >
      {filterOptions.map(({ label, name, options }: IFilterOption) => {
        return (
          <Select
            key={name}
            label={label}
            name={name}
            options={options}
            onChange={handleChange}
          />
        );
      })}

      <div style={{ width: "100%" }}>
        <Button small={true} onClick={() => setShowFilters((v) => !v)}>
          {showFilters ? "Esconder filtros" : "Mostrar filtros"}
        </Button>
      </div>
    </section>
  );
};

export default Filters;
