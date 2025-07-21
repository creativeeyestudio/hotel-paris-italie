import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";
import Navigation from "./Navigation";
import { fetchSettings } from "@/lib/cms";
import { SettingsProps } from "@/interfaces/settings";

interface FooterProps {
  locale: string;
}

const Footer: React.FC<FooterProps> = async ({ locale }) => {

  const settings: SettingsProps | null = await fetchSettings();

  if (!settings) return null;

  const telLink = (): string => {
    const tel: string = settings.contactDetails?.phone;

    if (!tel) return '';

    const linkTel = tel
      .replace(/ /g, '')
      .replace(tel.charAt(0), '+33');

    return linkTel;
  }

  return <footer className="footer bg-primary text-white p-[2rem] lg:px-[5.787vw] lg:py-[2.8935vw]">
    <div className="footer__row--1 grid grid-cols-12 gap-[2rem]">
      <div className="footer__block col-span-12 md:col-span-4 lg:col-span-5">
        <p className="footer__title text-lg mb-[1rem]">Accès et contact</p>
        <div className="grid lg:grid-cols-2">
          <p>
            {settings?.contactDetails?.adress}<br />
            {settings?.contactDetails?.postcode} {settings?.contactDetails?.city}
          </p>
          <p>
            <a href={`tel:${telLink()}`}>{settings.contactDetails?.phone}</a><br/>
            <a href={`mailto:${settings.contactDetails?.email}`}>{settings.contactDetails?.email}</a>
          </p>
        </div>
      </div>
      <div className="footer__block col-span-12 md:col-span-4">
        <p className="footer__title text-lg mb-[1rem]">Navigation</p>
        <Navigation menuId={"footer-menu"} locale={locale} classesList="grid gap-[.5rem] lg:grid-cols-2" />
      </div>
      <div className="footer__block col-span-12 md:col-span-4 lg:col-span-3">
        <p className="footer__title text-lg mb-[1rem]">Suivez nous</p>
        <ul className="flex gap-[1rem]">
          <li>
            <Facebook size={32} color="#ffffff" strokeWidth={1.5} absoluteStrokeWidth />
          </li>
          <li>
            <Instagram size={32} color="#ffffff" strokeWidth={1.5} absoluteStrokeWidth />
          </li>
        </ul>
      </div>
    </div>
    <hr className="my-[2rem] lg:my-[2.8935vw]" />
    <div className="footer_row--2 text-xs leading-none md:text-center">
      <p>
        <span className="flex gap-[.75rem] md:justify-center">
          <Link href={""}>Mentions légales</Link>
          <Link href={""}>Confidentialité</Link>
          <Link href={""}>CGV</Link>
          <span>Cookies</span>
        </span><br />
        Conception et développement : Com&apos; A Votre Image
      </p>
    </div>
  </footer>;
};

export default Footer;
