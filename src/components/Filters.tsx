import React, { useState } from "react";
import styles from "./Filters.module.scss";
import Select from "./inputs/Select";
import { Button } from "./blocks/Button";

interface IProps {
  filterOptions: IFilterOption[];
  values: { [key: string]: string | number };
  handleChange: (e: any) => void;
}

export interface IFilterOption {
  label: string;
  name: string;
  options: {
    text: string;
    value: string | number;
  }[];
}

const Filters = ({ filterOptions, values, handleChange }: IProps) => {
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
            value={values[name]}
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
