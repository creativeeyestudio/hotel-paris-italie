import { HeroscreenProps } from "./blocks";
import { ImageDataProps } from "./image";

export interface RoomPageProps {
  intro: {
    heroscreen: HeroscreenProps[];
    introTitle: string;
    introContentHtml: string;
  };
  services: {
    serviceList: [
      {
        serviceLabel: string;
        serviceIcon:
          | "bathroom"
          | "air"
          | "wifi"
          | "phone"
          | "safe"
          | "minibar"
          | "television"
          | "courtesyTray";
      },
    ];
  };
  rooms: {
    roomsList: RoomItemProps[];
  };
}

interface RoomItemProps {
  roomName: string;
  roomDescHtml: string;
  roomImage: ImageDataProps;
}
