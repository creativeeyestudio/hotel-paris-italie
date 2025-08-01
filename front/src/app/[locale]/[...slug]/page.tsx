import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { fetchPage, fetchSettings } from "@/lib/cms";
import ContentPageItems from "@/components/layout/ContentPageItems";
import { headers } from "next/headers";
import { isHomePage } from "@/lib/isHomePage";
import Heroscreen from "@/components/panels/Heroscreen";
import { SettingsProps } from "@/interfaces/settings";

/* --------------------------------------------------
   Types & helpers
-------------------------------------------------- */
export type PageParams = Promise<{
  locale: string;
  slug: string;
}>;

/* --------------------------------------------------
   SEO dynamique
-------------------------------------------------- */
export async function generateMetadata(props: {
  params: PageParams;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const headersList = await headers();
  const site = headersList.get("x-website") ?? "default-site";
  const settings: SettingsProps | null = await fetchSettings();

  const page = await fetchPage(site, slug, locale);
  if (!page) return { title: "Page introuvable" };

  const { title, description } = page.meta;
  const fullTitle = `${title ?? page.title} | ${settings?.title}`;

  return {
    title: fullTitle,
    description: description ?? "",
    generator: "Dreamsite V3",
    authors: [{ name: "Kévin RIFA", url: "https://creative-eye.fr" }],
    openGraph: { title, description, url: "/", type: `website` },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* --------------------------------------------------
   Rendu de la page
-------------------------------------------------- */
export default async function WebPage(props: { params: PageParams }) {
  const { locale, slug } = await props.params;
  const headersList = await headers();
  const site = headersList.get("x-website") ?? "default-site";
  const page = await fetchPage(site, slug, locale);

  if (!page) return notFound();

  if (await isHomePage(page)) redirect(`/${locale}`);

  const heroscreen = page.content?.heroscreen[0]?.heroImage;

  return (
    <>
      {heroscreen ? <Heroscreen heroImage={heroscreen} /> : <></>}
      <ContentPageItems blocks={page.content.layout} locale={locale} />
    </>
  );
}
