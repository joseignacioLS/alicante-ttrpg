"use client";

import React, { useContext } from "react";
import JoinForm from "./forms/JoinForm";
import { IGame } from "@/data/constants";
import { Button } from "./blocks/Button";
import { modalContext } from "@/context/modalContext";
import LoginForm from "./forms/LoginForm";

interface IProps {
  gameData: IGame;
  name: string | undefined | null;
}

const UserJoinGame = ({ gameData, name }: IProps) => {
  const logged = name !== undefined;
  const alreadyJoin =
    logged &&
    gameData.playerList.filter((v: any) => v.name === name).length > 0;
  const isMaster = logged && name === gameData.master;

  const { openModal, closeModal } = useContext(modalContext);

  return (
    <section>
      <h2>
        {alreadyJoin ? (
          "¡Ya te has unido a esta partida!"
        ) : (
          <Button
            onClick={() => {
              openModal(<LoginForm callback={closeModal} />);
            }}
          >
            Haz login para unirte
          </Button>
        )}
      </h2>
      {logged && !isMaster && !alreadyJoin && (
        <JoinForm gameId={gameData._id} playerList={gameData.playerList} />
      )}
    </section>
  );
};

export default UserJoinGame;
