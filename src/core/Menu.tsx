"use client";

import React from "react";
import { routes } from "@/routes/routes";
import Link from "next/link";
import styles from "./Menu.module.scss";
import { usePathname } from "next/navigation";

export const Menu = () => {
  const pathname = usePathname();
  return (
    <nav className={styles.navbar}>
      {routes.map((route) => {
        let selected = pathname === route.path;
        if (
          route.path.includes("/partidas") &&
          pathname?.includes("/partidas")
        ) {
          selected = true;
        }
        if (route.path.includes("/eventos") && pathname?.includes("/eventos")) {
          selected = true;
        }
        return (
          <Link
            key={route.path}
            href={route.path}
            className={`${styles.navbarItem} ${selected && styles.selected}`}
          >
            <span>{route.text}</span>
          </Link>
        );
      })}
    </nav>
  );
};
