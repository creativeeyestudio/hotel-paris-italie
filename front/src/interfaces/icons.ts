export interface IconProps {
  type:
    | "bathroom"
    | "air"
    | "wifi"
    | "phone"
    | "safe"
    | "minibar"
    | "television"
    | "courtesyTray";
  size?: number;
  color?: "black" | "white";
  className?: string;
}
