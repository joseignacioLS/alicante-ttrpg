import Carrousel from "@/components/Carrousel";
import Link from "next/link";
import React from "react";

const carrouselItems = [
  {
    id: "TablesManaVortex",
    element: (
      <div>
        <h2>Sesiones en Mana Vortex</h2>
        <p>Mesas abiertas para jugadores nuevos y veteranos, ¡apúntante ya!</p>
      </div>
    ),
  },
  {
    id: "1",
    element: (
      <div>
        <h2>¿Quieres iniciarte como GM?</h2>
        <p>¡Habla con nosotros!</p>
      </div>
    ),
  },
];

const Home = () => {
  return (
    <>
      <section>
        <img src="/placeholder.png" />
      </section>
      <h1>Alicante TTRPG</h1>
      <section>
        <h2>Novedades</h2>
        <Carrousel slides={carrouselItems} />
      </section>
      <section>
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
          las partidas previstas y en marcha. Entra y busca algo que se adapte a
          tu estilo.
        </p>
      </section>
    </>
  );
};

export default Home;
