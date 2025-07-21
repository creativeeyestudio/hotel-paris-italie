import { SettingsProps } from "@/interfaces/settings"
import { fetchSettings } from "@/lib/cms"
import Image from "next/image"

const Logo = async () => {
    const settings: SettingsProps | null = await fetchSettings();

    if (!settings || !settings.identityGroup.logo) return null;

    const imageUrl = process.env.NEXT_PUBLIC_API_URL + settings.identityGroup.logo.url;
    const image = <Image 
        src={imageUrl} 
        alt={settings.identityGroup.logo.alt ?? ''}
        fill={true}
        objectFit="contain"
    />

    return image;
}

export default Logo;