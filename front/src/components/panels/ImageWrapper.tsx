"use client";

import { ImageWrapperProps } from "@/types/ImageWrapper";
import { motion } from "framer-motion";
import Image from "next/image";

export const ImageWrapper = ({
  url,
  alt = "",
  className,
  anim = false,
  delay = 0,
  priority = false,
  sizes = ''
}: ImageWrapperProps) => (
  <figure className={className}>
    {anim ? (
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay, duration: 0.5, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.1 }}
        className="relative w-full h-full"
      >
        <Image src={url} alt={alt} fill style={{ objectFit: "cover" }} priority={priority} sizes={sizes} />
      </motion.div>
    ) : (
      <Image src={url} alt={alt} fill style={{ objectFit: "cover" }} />
    )}
  </figure>
);
