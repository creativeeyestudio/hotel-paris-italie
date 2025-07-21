'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { AspectRatio } from "../ui/aspect-ratio";
import { ImageDataProps } from "@/interfaces/image";
import { ImageWrapper } from "./ImageWrapper";

interface SwiperComponentsProps {
    images: ImageDataProps[]
    ratio?: number
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
                        <ImageWrapper 
                            url={process.env.NEXT_PUBLIC_API_URL + img.url} 
                            alt={img.alt} />
                    </AspectRatio>
                </SwiperSlide>
            ))}
        </Swiper>
    </>
}

export default SwiperComponent;