"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { getSpellInfo, getSpellList } from "@/utils/dataapi";
import Input from "@/components/inputs/Input";
import { Button } from "@/components/blocks/Button";

const Home = () => {
  const [spellList, setSpellList] = useState<any[]>([]);
  const [input, setInput] = useState<string>("");
  const [spellInfo, setSpellInfo] = useState<any>(undefined);

  const handleInput = (e: any) => {
    setSpellInfo(undefined);
    setInput(e.target.value);
  };

  const initializeSpellList = async () => {
    const newSpells = await getSpellList();
    setSpellList(newSpells.results);
  };

  const updateSpellInfo = async (name: string) => {
    const newSpell = await getSpellInfo(name);
    setSpellInfo(newSpell);
  };

  useEffect(() => {
    initializeSpellList();
  }, []);
  return (
    <main>
      <div className={`content ${styles.wrapper}`}>
        <section>
          <Input
            value={input}
            onChange={handleInput}
            placeholder="Nombre del hechizo"
          ></Input>
        </section>

        {!spellInfo && (
          <section className={styles.spellList}>
            {spellList
              .filter(
                (v) =>
                  input !== "" &&
                  v.name.toLowerCase().includes(input.toLowerCase())
              )
              .map((v) => {
                return (
                  <p
                    key={v.index}
                    onClick={(e) => {
                      setInput("");
                      updateSpellInfo(v.index);
                    }}
                  >
                    {v.name}
                  </p>
                );
              })}
          </section>
        )}
        {spellInfo && (
          <section className={styles.spellInfo}>
            <div className={styles.closeButton}>
              <Button small={true} onClick={() => setSpellInfo(undefined)}>
                Close
              </Button>
            </div>
            <h2>{spellInfo.name}</h2>
            <section>
              <p>Level: {spellInfo.level}</p>
              <p>Casting Time: {spellInfo.casting_time}</p>
              <p>Range: {spellInfo.range}</p>
              <p>Duration: {spellInfo.duration}</p>
              <p>
                Components:{" "}
                {spellInfo.components.map((v: string) => (
                  <span key={v}>{v}</span>
                ))}{" "}
                ({spellInfo.material && spellInfo.material})
              </p>
            </section>
            {spellInfo.damage && (
              <section>
                <h3>Damage</h3>
                {spellInfo.damage.damage_at_slot_level && (
                  <p>
                    {Object.entries(spellInfo.damage.damage_at_slot_level).map(
                      (entry: any) => {
                        return (
                          <li key={entry[0]}>{entry.join(" slot level = ")}</li>
                        );
                      }
                    )}
                  </p>
                )}
                {spellInfo.damage.damage_at_character_level && (
                  <p>
                    {Object.entries(
                      spellInfo.damage.damage_at_character_level
                    ).map((entry: any) => {
                      return (
                        <li key={entry[0]}>
                          {entry.join(" character level = ")}
                        </li>
                      );
                    })}
                  </p>
                )}
              </section>
            )}
            <section>
              <h3>DC</h3>
              {spellInfo.dc && (
                <p>
                  {spellInfo.dc.dc_type.name} = {spellInfo.dc.dc_success}
                </p>
              )}
            </section>
            <h3>Description</h3>
            <section className={styles.spellDesc}>
              {spellInfo.desc.map((v: string) => (
                <p key={v}>{v}</p>
              ))}
              {spellInfo.higher_level && (
                <>
                  <h4>Higher Levels</h4>
                  {spellInfo.higher_level.map((v: string) => {
                    return <p key={v}>{v}</p>;
                  })}
                </>
              )}
            </section>
          </section>
        )}
      </div>
    </main>
  );
};

export default Home;
