import { DeviceType } from "@/types/DeviceType";
import { ImageDataProps } from "./image";

// CONTENT
// --------------------------------
export interface HTMLContentProps {
  blockType?: "html-content";
  content: string;
}

// PAGES
// --------------------------------
export interface TextProps {
  blockType?: "text";
  title: string;
  html: string;
  firstBlock: boolean;
}

export interface TextIntroProps {
  blockType?: "text-intro";
  title: string;
  html?: string;
  className?: string;
  firstBlock: boolean;
}

export interface TextImageProps {
  blockType?: "text-image";
  title: string;
  html?: string;
  image: ImageDataProps;
  cta?: CTA[];
  secondaryBg: boolean;
  linkList: LinkList[];
  subItem: SubItemList[];
  device: DeviceType;
  firstBlock: boolean;
}

export interface TextDoubleImageProps {
  blockType?: "text-double-image";
  title: string;
  html: string;
  image1: ImageDataProps;
  image2?: ImageDataProps;
  cta?: CTA[];
  secondaryBg: boolean;
  linkList: LinkList[];
  subItem: SubItemList[];
  device: DeviceType;
  firstBlock: boolean;
}

interface CTA {
  type:
    | "page"
    | "external"
    | "access-situation"
    | "rooms-page"
    | "reserve"
    | "homepage";
  label: string;
  isBlank: boolean;
}

export interface LinkList {
  linkName: string;
  linkUrl?: string;
}

export interface SubItemList {
  title: string;
  html: string;
}

export interface HeroscreenProps {
  blockType?: "heroscreen";
  heroImage: ImageDataProps[];
}

export interface ParallaxProps {
  blockType?: "parallax";
  parallaxImage: ImageDataProps;
  parallaxSpeed: number;
}
