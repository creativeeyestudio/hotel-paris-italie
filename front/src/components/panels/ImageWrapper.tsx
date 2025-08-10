"use client";

import { ImageWrapperProps } from "@/types/ImageWrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const ImageWrapper = ({
  url,
  alt = "",
  className,
  anim = false,
  delay = 0,
  priority = false,
}: ImageWrapperProps) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [imgHeight, setImgHeight] = useState<number | null>(null);

  const figureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateSize = () => {
      const desktop = window.innerWidth >= 1280;
      setIsDesktop(desktop);

      if (desktop && figureRef.current) {
        const height = figureRef.current.getBoundingClientRect().height;
        setImgHeight(height);
      } else {
        setImgHeight(null);
      }
    };

    updateSize();

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <figure
      ref={figureRef}
      className={className}
      style={isDesktop && imgHeight ? { height: `${imgHeight}px` } : {}}
    >
      {anim ? (
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay, duration: 0.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.1 }}
          className="relative w-full h-full"
        >
          <Image
            src={url}
            alt={alt}
            fill
            style={{ objectFit: "cover" }}
            priority={priority}
          />
        </motion.div>
      ) : (
        <Image src={url} alt={alt} fill style={{ objectFit: "cover" }} />
      )}
    </figure>
  );
};
