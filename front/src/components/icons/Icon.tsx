import {
  AirVent,
  Bath,
  HandPlatter,
  Key,
  Martini,
  Phone,
  TvMinimal,
  Wifi,
} from "lucide-react";

interface IconProps {
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
  color?: string;
}

const iconMap = {
  bathroom: Bath,
  air: AirVent,
  wifi: Wifi,
  phone: Phone,
  safe: Key,
  minibar: Martini,
  television: TvMinimal,
  courtesyTray: HandPlatter,
};

const Icon: React.FC<IconProps> = ({ type, size = 48, color = "black" }) => {
  const LucideIcon = iconMap[type];
  return LucideIcon ? (
    <LucideIcon size={size} color={color} absoluteStrokeWidth />
  ) : null;
};

export default Icon;
