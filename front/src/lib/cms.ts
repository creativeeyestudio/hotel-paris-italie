import { NavigationProps } from "@/interfaces/navigation";
import { Page } from "@/interfaces/page";
import { RoomPageProps } from "@/interfaces/room";
import { SettingsProps } from "@/interfaces/settings";

/* ------------------------------------------------------------------
   Constantes
------------------------------------------------------------------ */
const SETTINGS_ID = process.env.SITE_ID!;
const CMS_URL = process.env.NEXT_PUBLIC_API_URL!;

/* --------------------------------------------------
   Settings
-------------------------------------------------- */
const cachedSettingsMap: Record<string, SettingsProps> = {};

export async function fetchSettings(
  locale: string = "fr",
): Promise<SettingsProps | null> {
  if (cachedSettingsMap[locale]) return cachedSettingsMap[locale];

  const res = await fetch(
    `${CMS_URL}/api/settings/${SETTINGS_ID}?depth=2&draft=false&locale=${locale}`,
    {
      next: { revalidate: 0 },
      cache: "no-store",
    },
  );

  if (!res.ok) return null;

  const data = (await res.json()) as SettingsProps;
  cachedSettingsMap[locale] = data;
  return data;
}

/* --------------------------------------------------
   Pages
-------------------------------------------------- */
/**
 * @param site
 * @param locale
 * @returns
 */
export async function fetchHomePage(site: string, locale: string) {
  const settings = await fetchSettings();
  if (!settings) return null;

  const res = await fetch(
    `${CMS_URL}/api/pages/${settings.identityGroup?.homepage.id}?depth=2&locale=${locale}`,
    {
      headers: { "x-website": site },
      next: { revalidate: 0 },
      cache: "no-store",
    },
  );

  if (!res.ok) return null;
  return res.json();
}

/**
 * @param site
 * @param slug
 * @param locale
 * @returns
 */
export async function fetchPage(
  site: string,
  slug: string,
  locale: string,
): Promise<Page | null> {
  const res = await fetch(
    `${CMS_URL}/api/pages?where[slug][equals]=${slug}&depth=2&locale=${locale}`,
    {
      headers: { "x-website": site },
      next: { revalidate: 0 },
    },
  );

  if (!res.ok) return null;

  const { docs } = (await res.json()) as { docs: Page[] };
  return docs?.[0] ?? null;
}

/* --------------------------------------------------
   Page Chambres
-------------------------------------------------- */
/**
 * @param site
 * @param locale
 * @returns
 */
export async function fetchRoomPage(
  site: string,
  locale: string,
): Promise<RoomPageProps | null> {
  const res = await fetch(
    `${CMS_URL}/api/globals/roomPage?depth=2&draft=false&locale=${locale}`,
    {
      headers: { "x-website": site },
      next: { revalidate: 0 },
      cache: "no-store",
    },
  );

  if (!res.ok) return null;

  return res.json();
}

/* --------------------------------------------------
   Navigation
-------------------------------------------------- */
/**
 * @param site
 * @param menuId
 * @param locale
 * @returns
 */
export async function fetchNavigation(
  site: string,
  menuId: string,
  locale: string,
): Promise<NavigationProps | null> {
  const res = await fetch(
    `${CMS_URL}/api/navigation?where[menuId][equals]=${menuId}&depth=2&locale=${locale}`,
    {
      headers: { "x-website": site },
      next: { revalidate: 0 },
    },
  );

  if (!res.ok) return null;

  const { docs } = (await res.json()) as { docs: NavigationProps[] };
  return docs?.[0] ?? null;
}
