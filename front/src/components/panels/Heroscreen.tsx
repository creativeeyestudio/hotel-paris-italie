"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { HeroscreenProps } from "@/interfaces/blocks";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { AspectRatio } from "../ui/aspect-ratio";
import { useEffect, useState } from "react";
import { ImageWrapper } from "./ImageWrapper";

const Heroscreen = ({ heroImage }: HeroscreenProps) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [isMobile, setIsMobile] = useState(true);
  const [isTablet, setIsTablet] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  if (!apiUrl) return null;

  if (heroImage.length === 1) {
    const image = heroImage[0];
    return (
      <>
        {/* Mobile : 4/3 */}
        {isMobile && <AspectRatio ratio={4 / 3}>
          <Image
            src={apiUrl + image.url}
            alt={image.alt ?? "Pas de texte alt"}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </AspectRatio>}

        {/* Tablet : 16/9 */}
        {isTablet && <AspectRatio ratio={16 / 9}>
          <Image
            src={apiUrl + image.url}
            alt={image.alt ?? "Pas de texte alt"}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </AspectRatio>}

        {/* Desktop : Full width + height */}
        {isDesktop && <ImageWrapper url={apiUrl + image.url} alt={image.alt} className="w-full h-screen relative" />}
        
      </>
    );
  }

  return (
    <Swiper
      effect="fade"
      centeredSlides
      loop
      pagination={{ dynamicBullets: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      modules={[EffectFade, Pagination, Autoplay]}
      className="heroscreen"
    >
      {heroImage.map((image, index) => (
        <SwiperSlide key={index} className="heroscreen__container">
          <Image
            src={apiUrl + image.url}
            alt={image.alt ?? ""}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Heroscreen;
