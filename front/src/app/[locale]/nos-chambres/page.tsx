import Heroscreen from "@/components/panels/Heroscreen";
import TextImage from "@/components/panels/TextImage";
import TextIntro from "@/components/panels/TextIntro";
import { fetchRoomPage } from "@/lib/cms";
import { getDeviceDetector } from "@/lib/deviceDetector";
import { headers } from "next/headers";

export type RoomPageParams = Promise<{
  locale: string;
}>;

export default async function RoomPage(props: { params: RoomPageParams }) {
    const { locale } = await props.params;
    const headersList = await headers();
    const site = headersList.get("x-website") ?? "default-site";
    const device = await getDeviceDetector();
    const roomPageApi = await fetchRoomPage(site, locale);

    if (!roomPageApi) return;

    const heroscreen = roomPageApi.intro.heroscreen[0]?.heroImage;
    const introTitle = roomPageApi.intro.introTitle;
    const introContent = roomPageApi.intro.introContentHtml;
    const roomsList = roomPageApi.rooms.roomsList;

    return <>
        {heroscreen ? <Heroscreen heroImage={heroscreen} /> : <></>}
        {introTitle 
            ? <TextIntro title={introTitle} html={introContent} firstBlock={true}></TextIntro> 
            : <></>}
        
        {roomsList.map((room, index) => (
            <TextImage 
                title={room.roomName} 
                image={room.roomImage} 
                cta={[{
                    type: 'reserve',
                    label: "Réserver une chambre",
                    isBlank: false
                }]}
                html={room.roomDescHtml} 
                secondaryBg={false} 
                linkList={[]} 
                subItem={[]} 
                device={device} 
                firstBlock={false} 
                key={index} 
            />
        ))}
    </>;
}