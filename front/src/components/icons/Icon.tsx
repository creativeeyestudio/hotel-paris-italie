import { IconProps } from "@/interfaces/icons";
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

const Icon: React.FC<IconProps> = ({
  type,
  size = 48,
  color = "black",
  className = "",
}) => {
  const LucideIcon = iconMap[type];
  return LucideIcon ? (
    <LucideIcon
      size={size}
      color={color}
      className={className}
      absoluteStrokeWidth
    />
  ) : null;
};

export default Icon;
