"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { HeroscreenProps } from "@/interfaces/blocks";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { AspectRatio } from "../ui/aspect-ratio";

const Heroscreen = ({ heroImage }: HeroscreenProps) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return null;

  if (heroImage.length === 1) {
    const image = heroImage[0];
    return (
      <>
        {/* Mobile : 4/3 */}
        <div className="block sm:hidden">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={apiUrl + image.url}
              alt={image.alt ?? "Pas de texte alt"}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </AspectRatio>
        </div>

        {/* Tablet : 16/9 */}
        <div className="hidden sm:block lg:hidden">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={apiUrl + image.url}
              alt={image.alt ?? "Pas de texte alt"}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </AspectRatio>
        </div>

        {/* Desktop : Full width + height */}
        <div className="hidden lg:block w-full h-screen relative">
          <Image
            src={apiUrl + image.url}
            alt={image.alt ?? "Pas de texte alt"}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
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
