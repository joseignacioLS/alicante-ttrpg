import React, { useContext, useEffect, useState } from "react";
import styles from "./Card.module.scss";
import Link from "next/link";
import { IGame } from "@/data/constants";
import Image from "./blocks/Image";
import { userContext } from "@/context/userContext";

interface IProps {
  href?: string;
  item: IGame;
}

const Card = ({ item, href }: IProps) => {
  const [status, setStatus] = useState<"Aceptado" | "Rechazado" | undefined>(
    undefined
  );
  const { name } = useContext(userContext);

  useEffect(() => {
    const isJoined = item?.playerList.find((v) => v.name === name);
    if (!isJoined) setStatus(undefined);
    if (isJoined?.approved === true) setStatus("Aceptado");
    if (isJoined?.approved === false) setStatus("Rechazado");
  }, [name]);
  return (
    <Link href={href || "#"}>
      <article
        className={`${styles.card} 
        ${status === "Aceptado" && styles.approved}
        ${status === "Rechazado" && styles.rejected}`}
      >
        <div className={styles.image}>
          <Image src={item.image} />
        </div>
        <div className={styles.data}>
          <h2>{item.name}</h2>
          <>
            <span>{item.system}</span>
            <span>{item.duration}</span>
            <span>{item.experience}</span>
            <span>{new Date(item.startDate).toLocaleDateString("es-ES")}</span>
          </>
        </div>
      </article>
    </Link>
  );
};

export default Card;
