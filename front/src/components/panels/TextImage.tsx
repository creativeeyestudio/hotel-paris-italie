'use client'

import { TextImageProps } from "@/interfaces/blocks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";

const TextImage: React.FC<TextImageProps> = ({
  title,
  html,
  image,
  firstBlock,
}) => {
  const TitleTag = firstBlock ? "h1" : "h2";

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1280);
      setIsDesktop(window.innerWidth >= 1280);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return process.env.NEXT_PUBLIC_API_URL ? (
    <section className="
      lg:flex lg:flex-row lg:items-stretch lg:px-[5.787vw] lg:pt-[8.681vw] last:lg:pb-[8.681vw]
      lg:gap-x-[8.33%] even:lg:flex-row-reverse
    ">
    <div className="text-img__content p-[2rem] lg:p-0 lg:py-[5.787vw] w-full lg:w-5/12">
      <TitleTag className="text-img__title text-2xl md:text-3xl lg:text-4xl">
        {title}
      </TitleTag>
      <div
        className="text-img__text mt-[1.875rem]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>

    <figure className="text-img__image relative w-full lg:w-6/12">
      {isDesktop ? (
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + image.url}
          alt={image.alt ?? ""}
          fill
          objectFit="cover"
        />
      ) : (
        <AspectRatio ratio={isMobile ? 4 / 3 : 16 / 9}>
          <Image
            src={process.env.NEXT_PUBLIC_API_URL + image.url}
            alt={image.alt ?? ""}
            fill
            objectFit="cover"
          />
        </AspectRatio>
      )}
    </figure>
  </section>
) : (
  <></>
);

};

export default TextImage;
