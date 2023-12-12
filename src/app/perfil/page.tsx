"use client";

import FilteredList from "@/components/FilteredList";
import { Button } from "@/components/blocks/Button";
import LoginForm from "@/components/forms/LoginForm";
import { apiContext } from "@/context/apiContext";
import { userContext } from "@/context/userContext";
import Link from "next/link";
import React, { useContext } from "react";
import styles from "./page.module.scss";
import CollapsableSection from "@/components/blocks/CollapsableSection";

const Home = () => {
  const { name, email, admin } = useContext(userContext);
  const { logout } = useContext(apiContext);

  const handleLogout = () => {
    logout();
  };

  if (!name) {
    return (
      <section className={styles.login}>
        <LoginForm />
      </section>
    );
  }

  return (
    <>
      <section className={styles.userInfo}>
        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>Admin:</td>
              <td>
                <input
                  type="checkbox"
                  checked={admin as boolean}
                  onChange={undefined}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className={styles.actions}>
        <Link href="nueva-partida">
          <Button small={true}>Crear Partida</Button>
        </Link>
        {admin && (
          <Link href="/manager">
            <Button small={true}>Modo Manager</Button>
          </Link>
        )}
        <Button small={true} onClick={handleLogout}>
          Logout
        </Button>
      </section>
      <CollapsableSection
        title={<h2>Partidas como Master</h2>}
        content={<FilteredList fixedFilters={{ master: name }} />}
        defaultState={true}
      />
      <CollapsableSection
        title={<h2>Partidas como Player</h2>}
        content={
          <FilteredList fixedFilters={{ player: name, approved: true }} />
        }
        defaultState={true}
      />
    </>
  );
};

export default Home;
