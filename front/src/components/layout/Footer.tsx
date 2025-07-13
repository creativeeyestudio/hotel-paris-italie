import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";

interface FooterProps {
  locale: string;
}

const Footer: React.FC<FooterProps> = () => {
  return <footer className="footer bg-primary text-white p-[1.25rem]">
    <div className="footer__row--1 grid grid-cols-1 gap-[1.25rem]">
      <div className="footer__block">
        <p className="footer__title text-lg mb-[0.625rem]">Accès et contact</p>
        <div className="grid">
          <p>Adresse</p>
          <p>
            <a href="tel:+">00 00 00 00 00</a><br/>
            <a href="mailto:">example@xyz.fr</a>
          </p>
        </div>
      </div>
      <div className="footer__block">
        <p className="footer__title text-lg mb-[0.625rem]">Navigation</p>
      </div>
      <div className="footer__block">
        <p className="footer__title text-lg mb-[0.625rem]">Suivez nous</p>
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
    <hr className="my-[1.25rem]" />
    <div className="footer_row--2 text-xs leading-none">
      <p>
        <span className="flex gap-[.75rem]">
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
