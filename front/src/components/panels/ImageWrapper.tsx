import Image from "next/image";
import { ImageWrapperProps } from "@/types/ImageWrapper";

export const ImageWrapper = ({ url, alt = '', className }: ImageWrapperProps) => (
  <figure className={className}>
    <Image
      src={url}
      alt={alt}
      fill
      objectFit="cover"
    />
  </figure>
);