"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { games } from "@/data/games";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

const Home = () => {
  const [date, setDate] = useState<Date>(new Date());
  const router = useRouter();

  const handleScroll = (e: any) => {
    const scroll = e.target.scrollTop;
    const width = e.target.offsetWidth;
    if (scroll >= width) {
      setDate((old) => {
        const newDate = new Date(old);
        newDate.setDate(newDate.getDate() + 2);
        return newDate;
      });
    }
    if (scroll < width / 2) {
      setDate((old) => {
        const newDate = new Date(old);
        newDate.setDate(newDate.getDate() - 1);
        return newDate;
      });
    }
  };

  const handleClick = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    router.push(`/calendario/${year}-${month + 1}-${day}`);
  };

  const resetScroll = () => {
    const mainDom = document.querySelector("main");
    if (!mainDom) return;
    mainDom.scrollTo({ top: mainDom.offsetWidth / 2 - 20 });
  };

  const resetDate = () => {
    setDate(new Date());
    setTimeout(resetScroll, 0);
  };

  useEffect(() => {
    resetScroll();
  }, []);

  return (
    <main onScroll={handleScroll}>
      <div className="content">
        <div className={styles.resetDate}>
          <Button onClick={resetDate}>Today</Button>
        </div>
        <section>
          <div className={styles.calendar}>
            {[
              -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
              18,
            ].map((delta) => {
              const newDate = new Date(date);
              newDate.setDate(newDate.getDate() + delta);
              const events = games.filter(
                (v) => v.startDate?.toDateString() === newDate.toDateString()
              ).length;
              return (
                <article
                  onClick={() => events > 0 && handleClick(newDate)}
                  className={`${styles.day} ${events === 0 && styles.noEvents}`}
                  key={newDate.toDateString()}
                >
                  <p>{newDate.toDateString()}</p>
                  {events > 0 && <p>{events}</p>}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
