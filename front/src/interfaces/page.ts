import {
  HeroscreenProps,
  HTMLContentProps,
  ImageLinkProps,
  ParallaxProps,
  TextDoubleImageProps,
  TextImageProps,
  TextIntroProps,
  TextProps,
} from "./blocks";
import { SettingsProps } from "./settings";

export type BlockProps =
  | TextProps
  | TextIntroProps
  | TextImageProps
  | TextDoubleImageProps
  | ParallaxProps
  | HeroscreenProps
  | ImageLinkProps
  | HTMLContentProps;

export interface Page {
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  content: {
    heroscreen: HeroscreenProps[];
    layout: BlockProps[];
  };
  config: {
    site: SettingsProps;
  };
  meta: {
    title: string;
    description: string;
  };
  id: string;
}
