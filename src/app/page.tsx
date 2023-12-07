import HomeBanner from "@/components/HomeBanner";
import CarouselCard from "@/components/blocks/CarouselCard";
import Carousel from "@/components/blocks/Carousel";
import Link from "next/link";
import React from "react";

const carouselSlides = [
  <CarouselCard
    backgroundImage="/placeholder.png"
    title={<h2>Sesiones en Mana Vortex</h2>}
    content={
      <p>Mesas abiertas para jugadores nuevos y veteranos, ¡apúntante ya!</p>
    }
  />,
  <CarouselCard
    title={<h2>¿Quieres iniciarte como GM?</h2>}
    content={<p>¡Habla con nosotros!</p>}
  />,
];

const Home = () => {
  return (
    <>
      <HomeBanner />
      <h2>Novedades</h2>
      <section className="wholeW">
        <Carousel slides={carouselSlides} />
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
