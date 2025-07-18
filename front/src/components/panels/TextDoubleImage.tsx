'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TextDoubleImageProps } from "@/interfaces/blocks";
import { Swiper, SwiperSlide } from "swiper/react";
import { AspectRatio } from "../ui/aspect-ratio";

import '@/styles/components/text-double-image.scss';

const TextDoubleImage: React.FC<TextDoubleImageProps> = ({
  title,
  html,
  image1,
  image2,
  secondaryBg,
  firstBlock,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const imgRatio = isMobile ? 4/3 : 16/9;
  const TitleTag = firstBlock ? "h1" : "h2";

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

  return apiUrl != undefined ? (
    <section className={`text-double-img ${secondaryBg ? 'text-double-img--sec-color' : ''}`}>
      
      <div className="text-double-img__content">
        <TitleTag className="text-double-img__title">{title}</TitleTag>
        <div
          className="text-double-img__text"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>

      {isDesktop && <div className={`text-double-img__images`}>
        <figure className={`text-double-img__image--1 ${image2 ? 'text-double-img__image--half' : 'text-double-img__image--full'}`}>
          <Image 
            src={apiUrl + image1.url} 
            alt={image1.alt ?? ""} 
            fill={true} 
            objectFit="cover"/>  
        </figure>
        {(image2 !== undefined && image2 !== null) && <figure className="text-double-img__image--2">
          <Image 
            src={apiUrl + image2.url} 
            alt={image1.alt ?? ""} 
            fill={true} 
            objectFit="cover"/>  
        </figure>}
      </div>}

      {(isMobile || isTablet) && (
        (image2 === undefined || image2 === null) ? (
          <AspectRatio ratio={imgRatio}>
            <Image 
              src={apiUrl + image1.url} 
              alt={image1.alt ?? ""} 
              fill={true} 
              objectFit="cover"/>
          </AspectRatio>
        ) : (
          <>
            <div id="containerForBullets"></div>
            <Swiper 
              autoplay={true} 
              navigation
              pagination={{ 
                el: "#containerForBullets",
                clickable: true,
                type: "bullets",
                bulletClass: "swiper-custom-bullet",
                bulletActiveClass: "swiper-custom-bullet-active",
              }}
              >
              {[image1, image2].map((img, index) => (
                <SwiperSlide key={index}>
                  <AspectRatio ratio={imgRatio}>
                    <Image 
                      src={apiUrl + img.url} 
                      alt={img.alt ?? ""} 
                      fill 
                      objectFit="cover" 
                    />
                  </AspectRatio>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )
      )}
    </section>
  ) : (<></>);
};

export default TextDoubleImage;
