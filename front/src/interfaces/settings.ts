import { ImageDataProps } from "./image";
import { Page } from "./page";

export interface SettingsProps {
  createdAt: string;
  updatedAt: string;
  title: string;
  identityGroup: {
    logo: ImageDataProps;
    favicon: ImageDataProps;
    homepage: Page;
  };
  maintenanceGroup: {
    maintenance: boolean;
  };
  contactDetails: {
    adress: string;
    postcode: string;
    city: string;
    phone: string;
    email: string;
  };
  accessPage: {
    accessImage?: ImageDataProps;
    accessList?: AccessListItem[];
    accessLong?: number;
    accessLat?: number;
    accessMapLink?: string;
    accessIntroHtml?: string;
  };
}

interface AccessListItem {
  accessName: string;
  html: string;
}
