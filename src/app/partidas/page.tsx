import { games } from "@/data/games";
import styles from "./page.module.scss";
import Game from "@/components/Game";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className={`content`}>
        <h1>Listado de Partidas</h1>
        <section className={styles.gameList}>
          {games.map((game) => {
            return (
              <Link key={game.id} href={`/partidas/${game.id}`}>
                <Game game={game} />
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
