import Heroscreen from "@/components/panels/Heroscreen";
import IconsList from "@/components/panels/IconsList";
import TextImage from "@/components/panels/TextImage";
import TextIntro from "@/components/panels/TextIntro";
import { SettingsProps } from "@/interfaces/settings";
import { fetchRoomPage, fetchSettings } from "@/lib/cms";
import { getDeviceDetector } from "@/lib/deviceDetector";
import { slugify } from "@/lib/utils";
import { Metadata } from "next";
import { headers } from "next/headers";

export type RoomPageParams = Promise<{
  locale: string;
}>;

const metaTitle: Record<string, string> = {
  fr: "Nos chambres et suites",
  en: "Our rooms and suites",
  es: "Nuestras habitaciones y suites",
};

const metaDesc: Record<string, string> = {
  fr: "Nos chambres et suites",
  en: "Our rooms and suites",
  es: "Nuestras habitaciones y suites",
};

/* --------------------------------------------------
   SEO dynamique
-------------------------------------------------- */
export async function generateMetadata(props: {
  params: RoomPageParams;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const settings: SettingsProps | null = await fetchSettings();
  const title = `${metaTitle[locale]} | ${settings?.title}`;
  const description = metaDesc[locale];

  return {
    title: title,
    description: description,
    generator: "Dreamsite V3",
    authors: [{ name: "Kévin RIFA", url: "https://creative-eye.fr" }],
    openGraph: { title, description, url: "/", type: `website` },
    twitter: { card: "summary_large_image", title, description },
  };
}

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
  const services = roomPageApi.services.serviceList;
  const roomsList = roomPageApi.rooms.roomsList;

  const btnReserveLabel: Record<string, string> = {
    fr: "Réserver une chambre",
    en: "Book a room",
    es: "Reservar una habitación",
  };

  return (
    <>
      {heroscreen ? <Heroscreen heroImage={heroscreen} /> : <></>}

      {introTitle ? (
        <TextIntro
          title={introTitle}
          html={introContent}
          firstBlock={true} 
          linkList={roomsList.map((room) => ({
            linkName: room.roomName,
            linkUrl: '#' + slugify(room.roomName) 
          }))}        
        />
      ) : (
        <></>
      )}

      <IconsList serviceList={services} />

      {roomsList.map((room, index) => (
        <TextImage
          title={room.roomName}
          image={room.roomImage}
          cta={[
            {
              type: "reserve",
              label: btnReserveLabel[locale],
              isBlank: false,
            },
          ]}
          html={room.roomDescHtml}
          secondaryBg={false}
          linkList={[]}
          subItem={[]}
          idBlock={slugify(room.roomName)}
          device={device}
          firstBlock={false}
          key={index}
        />
      ))}
    </>
  );
}
