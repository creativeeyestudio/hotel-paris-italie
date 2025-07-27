import { HeroscreenProps } from "./blocks";
import { ImageDataProps } from "./image";

export interface RoomPageProps {
  intro: {
    heroscreen: HeroscreenProps[];
    introTitle: string;
    introContentHtml: string;
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
