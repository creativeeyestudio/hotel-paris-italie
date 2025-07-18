'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Ukiyo from "ukiyojs";
import { ParallaxProps } from "@/interfaces/blocks";

import '@/styles/components/parallax.scss';

const Parallax: React.FC<ParallaxProps> = ({
  parallaxImage,
  parallaxSpeed,
}) => {
  new Ukiyo(".parallax_image", {
    speed: parallaxSpeed,
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  })
  
  return apiUrl && isDesktop && (
    <>
      <figure className="parallax">
        <Image
          className="parallax_image"
          src={apiUrl + parallaxImage.url}
          alt={parallaxImage.alt ?? ""}
          fill={true}
        />
      </figure>
    </>
  );
};

export default Parallax;
