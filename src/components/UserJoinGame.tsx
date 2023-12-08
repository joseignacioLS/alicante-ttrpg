import React from "react";
import JoinForm from "./forms/JoinForm";
import { IGame } from "@/data/constants";

interface IProps {
  gameData: IGame;
  name: string | undefined;
}

const UserJoinGame = ({ gameData, name }: IProps) => {
  const logged = name !== undefined;
  const alreadyJoin =
    logged &&
    gameData.playerList.filter((v: any) => v.name === name).length > 0;
  const isMaster = logged && name === gameData.master;

  return (
    <section>
      <h2>
        {alreadyJoin
          ? "¡Ya te has unido a esta partida!"
          : "Haz login para unirte"}
      </h2>
      {logged && !isMaster && !alreadyJoin && (
        <JoinForm gameId={gameData._id} playerList={gameData.playerList} />
      )}
    </section>
  );
};

export default UserJoinGame;
