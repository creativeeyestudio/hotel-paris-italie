import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";
import Navigation from "./Navigation";

interface FooterProps {
  locale: string;
}

const Footer: React.FC<FooterProps> = async ({ locale }) => {

  return <footer className="footer bg-primary text-white p-[2rem] lg:px-[5.787vw] lg:py-[2.8935vw]">
    <div className="footer__row--1 grid grid-cols-12 gap-[2rem]">
      <div className="footer__block col-span-12 md:col-span-4">
        <p className="footer__title text-lg mb-[1rem]">Accès et contact</p>
        <div className="grid lg:grid-cols-2">
          <p>Adresse</p>
          <p>
            <a href="tel:+">00 00 00 00 00</a><br/>
            <a href="mailto:">example@xyz.fr</a>
          </p>
        </div>
      </div>
      <div className="footer__block col-span-12 md:col-span-4">
        <p className="footer__title text-lg mb-[1rem]">Navigation</p>
        <Navigation menuId={"footer-menu"} locale={locale} classesList="grid gap-[.5rem] lg:grid-cols-2" />
      </div>
      <div className="footer__block col-span-12 md:col-span-4">
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
