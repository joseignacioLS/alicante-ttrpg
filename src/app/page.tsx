import Carrousel from "@/components/Carrousel";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <main>
      <div className={"content"}>
        <img src="https://media.istockphoto.com/photos/tabletop-role-playing-flat-lay-background-with-colorful-rpg-dices-and-picture-id1178549496?k=20&m=1178549496&s=170667a&w=0&h=a3AnnLdKam0fqEa8MgRO868qaj-TL4MMoKe0tWwLDd4=" />
        <h1>Alicante TTRPG</h1>
        <h2>Novedades</h2>
        <Carrousel slides={[]} />
        <h2>¿Buscas gente con la que jugar?</h2>
        <p>
          Ya seas una persona sin experiencia o conozcas los TTRPG como Dungeons
          and Dragons, Pathfinder, Call of Cthulhu, Vampiro... Este es tu lugar
          para encontrar a personas con tus mismos gustos
        </p>
        <h3>Nuestros canales de comunicacion</h3>
        <p>
          Únete a nuestros canales para vivir el minuto a minuto del rol en
          Alicante
        </p>
        <h3>Visita nuestra página de partidas</h3>
        <p>
          En nuestra <Link href="/partidas">página de partidas</Link> publicamos
          las partidas previstas y en marcha con posibilidad de recibir
          jugadores
        </p>
      </div>
    </main>
  );
};

export default Home;
