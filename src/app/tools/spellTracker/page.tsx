"use client";

import Select from "@/components/inputs/Select";
import { EClass, ELevel } from "@/data/spells";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { Button } from "@/components/Button";
import { getClassSpellSlots } from "@/utils/dataapi";

const Home = () => {
  const [pjInfo, setPjInfo] = useState<{
    class: EClass;
    level: ELevel;
    slots: any;
  }>({
    class: EClass.bard,
    level: ELevel.Level1,
    slots: { current: {}, max: {} },
  });

  const [slotTracker, setSlotTracker] = useState<{ [key: number]: string }>({});

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setPjInfo((old) => {
      return { ...old, [name]: value };
    });
  };

  const handleTrackerChange = (e: any) => {
    navigator.vibrate(200)
    const level = e.target.name;
    const value = e.target.value;
    setSlotTracker((old) => {
      return { ...old, [level]: value };
    });
  };

  const resetSpells = () => {
    setSlotTracker((old) => {
      const newTracker: any = {};
      Object.keys(old).forEach((key: string) => {
        newTracker[key] = pjInfo.slots.current[+key];
      });
      return newTracker;
    });
  };

  const loadLocalStorage = () => {
    const stored = window.localStorage.getItem("slotTracker");
    if (!stored) {
      initializeTracker();
      return;
    }

    const parsed = JSON.parse(stored);
    setPjInfo((old) => {
      return { ...old, class: parsed.class, level: parsed.level };
    });
    setSlotTracker(parsed.slotTracker);
  };

  const saveLocalStorage = () => {
    const toStore = {
      class: pjInfo.class,
      level: pjInfo.level,
      slotTracker: slotTracker,
    };
    window.localStorage.setItem("slotTracker", JSON.stringify(toStore));
  };

  const initializeTracker = () => {
    const newSlotTracker: any = {};
    Object.entries(pjInfo.slots.max).forEach((entry) => {
      const [level] = entry;
      newSlotTracker[level] = 0;
    });
    setSlotTracker(newSlotTracker);
  };

  const getSlotsInfo = async () => {
    const { currentLevel, maxLevel } = await getClassSpellSlots(
      pjInfo.class,
      +pjInfo.level
    );
    setPjInfo((old) => {
      return { ...old, slots: { current: currentLevel, max: maxLevel } };
    });
  };

  useEffect(() => {
    loadLocalStorage();
    getSlotsInfo();
  }, []);

  useEffect(() => {
    getSlotsInfo();
  }, [pjInfo.class, pjInfo.level]);

  useEffect(() => {
    if (!slotTracker["1"]) return;
    saveLocalStorage();
  }, [pjInfo, slotTracker]);

  return (
    <main>
      <div className="content">
        <section className={styles.filter}>
          <Select
            name="class"
            value={pjInfo.class}
            options={[
              ...Object.values(EClass)
                .filter((v) => typeof v === "string")
                .map((v) => {
                  return {
                    value: v,
                    text: v,
                  };
                }),
            ]}
            onChange={handleChange}
          />
          <Select
            name="level"
            value={pjInfo.level}
            options={Object.values(ELevel)
              .filter((v) => typeof v === "number")
              .map((level) => {
                return { text: "" + level, value: level };
              })}
            onChange={handleChange}
          />
        </section>
        <div className={styles.actions}>
          <Button onClick={resetSpells}>Descanso Largo</Button>
        </div>
        <section className={styles.tracker}>
          {pjInfo.slots?.current?.[1] !== undefined &&
            Object.entries(pjInfo.slots.max).map((entry) => {
              const [level, slots] = entry as number[];
              return (
                <label key={level} className={styles.level}>
                  <span className={styles.levelTitle}>Nivel: {level}</span>
                  <div className={styles.radioWrapper}>
                    {Array.from(Array(slots + 1).keys()).map((slot) => {
                      const levelDisable = pjInfo.level < +level;
                      const slotDisable = slot > pjInfo.slots.current[+level];
                      return (
                        <input
                          className={`${styles.radioInput} ${
                            slot === 0 && styles.outOfSlots
                          }`}
                          key={`${level}-${slot}`}
                          type="radio"
                          name={"" + level}
                          value={slot}
                          checked={slot === +slotTracker[+level]}
                          onChange={handleTrackerChange}
                          disabled={(levelDisable || slotDisable) && slot > 0}
                          data-label={slot}
                        ></input>
                      );
                    })}
                  </div>
                </label>
              );
            })}
        </section>
      </div>
    </main>
  );
};

export default Home;
