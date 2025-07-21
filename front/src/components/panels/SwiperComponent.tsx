'use client'

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { AspectRatio } from "../ui/aspect-ratio";
import { ImageDataProps } from "@/interfaces/image";

interface SwiperComponentsProps {
    images: ImageDataProps[]
    ratio: number
}

const SwiperComponent = ({ images, ratio }: SwiperComponentsProps) => {
    return <>
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
            {images.map((img, index) => (
                <SwiperSlide key={index}>
                    <AspectRatio ratio={ratio}>
                        <Image 
                            src={process.env.NEXT_PUBLIC_API_URL + img.url} 
                            alt={img.alt ?? ''} 
                            fill={true}
                            objectFit="cover"></Image>
                    </AspectRatio>
                </SwiperSlide>
            ))}
        </Swiper>
    </>
}

export default SwiperComponent;