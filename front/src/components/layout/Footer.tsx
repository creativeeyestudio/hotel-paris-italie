import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";
import Navigation from "./Navigation";
import { fetchSettings } from "@/lib/cms";
import { SettingsProps } from "@/interfaces/settings";
import Icon from "../icons/Icon";

interface FooterProps {
  locale: string;
}

const title: Record<string, [string, string, string]> = {
  fr: ["Accès et contact", "Navigation", "Suivez nous"],
  en: ["Access and contact", "Navigation", "Follow us"],
  es: ["Acceso y contacto", "Navigaciones", "Síganos"],
};

const Footer: React.FC<FooterProps> = async ({ locale }) => {
  const settings: SettingsProps | null = await fetchSettings();

  if (!settings) return null;

  const telLink = (): string => {
    const tel: string = settings.contactDetails?.phone;

    if (!tel) return "";

    const linkTel = tel.replace(/ /g, "").replace(tel.charAt(0), "+33");

    return linkTel;
  };

  return (
    <footer className="footer">
      <div className="footer__site-nav">
        <div className="footer__nav-block">
          <p className="footer__title text-lg mb-[1rem]">{title[locale][0]}</p>
          <div className="grid lg:grid-cols-2">
            <p>
              {settings?.contactDetails?.adress}
              <br />
              {settings?.contactDetails?.postcode}{" "}
              {settings?.contactDetails?.city}
            </p>
            <p>
              <a href={`tel:${telLink()}`} className="footer__link">
                <Icon type={"phone"} size={'16'} className="float-left mr-2 mt-1" color="white" />
                {settings.contactDetails?.phone}
              </a>
              <br />
              <a
                href={`mailto:${settings.contactDetails?.email}`}
                className="footer__link"
              >
                <Icon type={"mail"} size={'16'} className="float-left mr-2 mt-1" color="white" />
                {settings.contactDetails?.email}
              </a>
            </p>
          </div>
        </div>
        <div className="footer__nav-block">
          <p className="footer__title text-lg mb-[1rem]">{title[locale][1]}</p>
          <Navigation
            menuId={"footer-menu"}
            locale={locale}
            classes="nav__footer"
          />
        </div>
        <div className="footer__nav-block">
          <p className="footer__title text-lg mb-[1rem]">{title[locale][2]}</p>
          <ul className="flex gap-[1rem]">
            <li>
              <Facebook
                size={32}
                color="#ffffff"
                strokeWidth={1.5}
                absoluteStrokeWidth
              />
            </li>
            <li>
              <Instagram
                size={32}
                color="#ffffff"
                strokeWidth={1.5}
                absoluteStrokeWidth
              />
            </li>
          </ul>
        </div>
      </div>
      <hr className="footer__separate" />
      <div className="footer__legal-nav">
        <p>
          <span className="footer__legal-links">
            <Link href={""} className="footer__link">
              Mentions légales
            </Link>
            <Link href={""} className="footer__link">
              Confidentialité
            </Link>
            <Link href={""} className="footer__link">
              CGV
            </Link>
            <span className="footer__link">Cookies</span>
          </span>
          <span>
            Conception et développement :{" "}
            <a href="" className="footer__link">
              Com&apos; A Votre Image
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
