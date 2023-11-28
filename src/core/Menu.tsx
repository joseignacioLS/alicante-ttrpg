"use client";

import { routes } from "@/routes/routes";
import Link from "next/link";
import React from "react";
import styles from "./Menu.module.scss";
import { usePathname } from "next/navigation";

export const Menu = () => {
  const pathname = usePathname();
  return (
    <nav className={styles.navbar}>
      {routes.map((route) => {
        return (
          <Link
            key={route.path}
            href={route.path}
            className={`${styles.navbarItem} ${
              pathname === route.path && styles.selected
            }`}
          >
            <span>{route.text}</span>
          </Link>
        );
      })}
    </nav>
  );
};
