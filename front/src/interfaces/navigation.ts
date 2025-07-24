import { ImageDataProps } from "./image";
import { Page } from "./page";

export interface NavigationProps {
  createdAt: string | Date;
  updatedAt: string | Date;
  menuId: "main-menu" | "secondary-menu" | "footer-menu";
  items: MenuItem[];
  id: string;
}

export interface MenuItem {
  type: "page" | "external" | "access-situation" | "rooms-page" | "reserve" | 'homepage';
  page?: Page;
  label?: string;
  url?: string;
  newTab?: boolean;
  children: MenuItem[];
  id: string;
  image: ImageDataProps;
}
