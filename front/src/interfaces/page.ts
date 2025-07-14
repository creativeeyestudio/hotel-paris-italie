import {
  HeroscreenProps,
  HTMLContentProps,
  ParallaxProps,
  TextDoubleImageProps,
  TextImageProps,
  TextIntroProps,
  TextProps,
} from "./blocks";
import { ImageDataProps } from "./image";
import { SettingsProps } from "./settings";

export type BlockProps =
  | TextProps
  | TextIntroProps
  | TextImageProps
  | TextDoubleImageProps
  | ParallaxProps
  | HeroscreenProps
  | HTMLContentProps

export interface Page {
  createdAt: string
  updatedAt: string
  title: string
  slug: string
  content: {
    heroscreen: HeroscreenProps
    layout: BlockProps[]
  }
  config: {
    site: SettingsProps
  }
  meta: {
    title: string;
    description: string;
  }
  id: string
}
