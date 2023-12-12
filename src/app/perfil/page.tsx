"use client";

import Card from "@/components/Card";
import CardList from "@/components/CardList";
import FilteredList from "@/components/FilteredList";
import { Button } from "@/components/blocks/Button";
import LoginForm from "@/components/forms/LoginForm";
import { apiContext } from "@/context/apiContext";
import { userContext } from "@/context/userContext";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const Home = () => {
  const { getUserGames } = useContext(apiContext);
  const { name, email, admin } = useContext(userContext);
  const { logout } = useContext(apiContext);

  const [userGames, setUserGames] = useState<{ player: any[]; master: any[] }>({
    player: [],
    master: [],
  });

  const handleLogout = () => {
    logout();
  };

  const updateGames = async (name: string) => {
    const response = await getUserGames(name);
    setUserGames(response);
  };

  useEffect(() => {
    if (!name) return;
    updateGames(name);
  }, [name]);

  if (!name) {
    return (
      <section>
        <LoginForm />
      </section>
    );
  }

  return (
    <>
      <section>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>
          Admin:{" "}
          <input
            type="checkbox"
            checked={admin as boolean}
            onChange={undefined}
          />
        </p>
      </section>
      <section>
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
      <section>
        <h2>Mastered Games</h2>
        <FilteredList fixedFilters={{ master: name }} />
      </section>
      <section>
        <h2>Joined Games</h2>
        <FilteredList fixedFilters={{ player: name, approved: true }} />
        {/* <CardList>
          {userGames.player?.map((game) => {
            return (
              <Card key={game._id} href={`/partidas/${game._id}`} item={game} />
            );
          })}
        </CardList> */}
      </section>
    </>
  );
};

export default Home;
