"use client";

import React, { useEffect, useState } from "react";

interface IProps {
  src: string | undefined;
  alt?: string;
  className?: string;
  style?: {};
}

const Image = ({ src, alt, className, style }: IProps) => {
  const [displaySrc, setDisplaySrc] = useState(src);

  const checkSrc = () => {
    const imgDummy = document.createElement("img");
    imgDummy.onerror = () => {
      setDisplaySrc("/placeholder.png");
    };
    imgDummy.onload = () => {
      setDisplaySrc(src);
    };
    imgDummy.src = src || "";
  };
  useEffect(() => {
    checkSrc();
  }, [src]);
  return <img src={displaySrc} alt={alt} className={className} style={style} />;
};

export default Image;
