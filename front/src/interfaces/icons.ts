export interface IconProps {
  type:
    | "bathroom"
    | "air"
    | "wifi"
    | "phone"
    | "safe"
    | "minibar"
    | "television"
    | "courtesyTray"
    | 'mail';
  size?: string | number;
  color?: "black" | "white";
  className?: string;
}
