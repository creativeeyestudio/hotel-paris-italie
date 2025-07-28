"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Logo from "../../../public/logo-hotel-paris-italie.jpg";

const LoaderSite = () => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsClosing(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`loader--site ${isClosing ? "loader--close" : "loader--open"}`}
    >
      <div className="loader__block">
        <figure className="loader__logo">
          <Image src={Logo.src} alt="Logo Loader" fill objectFit="contain" />
        </figure>
      </div>
    </div>
  );
};

export default LoaderSite;
