"use client";

import { useParams } from "next/navigation";
import React from "react";

const Home = () => {
  const { id } = useParams();

  return (
    <main>
      <div className="content">
        <h1>{id}</h1>
      </div>
    </main>
  );
};

export default Home;
