"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import toggleReservePopup from "@/lib/toggleReservePopup";
import NavLink from "./NavLink";
import { toUpperCaseSafe } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface ToggleLangProps {
  currentLocale: string;
}

const ToggleLang: React.FC<ToggleLangProps> = ({ currentLocale }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locales = ["en", "fr", "es"];

  const [isDesktop, setIsDesktop] = useState(false);

  const handleLocaleChange = (targetLocale: string) => {
    if (targetLocale === currentLocale) return;

    const segments = pathname.split("/");
    segments[1] = targetLocale;
    const newPath = segments.join("/");

    router.push(newPath);
  };

  const bookingTexts: Record<string, string> = {
    fr: "Réserver",
    en: "Booking",
    es: "Reservar",
  };

  useEffect(() => {
  const updateIsDesktop = () => setIsDesktop(window.innerWidth >= 1280);
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);


  return (
    <div className="flex items-center gap-4 space-x-2 text-sm">
      
      <DropdownMenu>
        <DropdownMenuTrigger className='uppercase font-medium'>
          {currentLocale}
        </DropdownMenuTrigger>
        <DropdownMenuContent className='z-[9999]'>
          {locales.map((locale, index) => (
            <DropdownMenuItem className='uppercase' onClick={() => handleLocaleChange(locale)} key={index}>{locale}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <span className="hidden md:block xl:hidden">|</span>

      <Button
        variant={isDesktop ? 'default' : 'link'}
        size={isDesktop ? 'default' : 'sm'}
        className={`hidden md:block uppercase ${isDesktop ? 'btn--primary text-black' : 'lg:text-white px-0'}`}
        onClick={() => toggleReservePopup()}
      >
        {bookingTexts[currentLocale]}
      </Button>

      <span className="hidden md:block xl:hidden">|</span>

      <div className="hidden md:block">
        <NavLink 
          isExternal={false} 
          linkType={"access-situation"} 
          label={toUpperCaseSafe("Venir à l'hôtel")} 
          isBlank={false} 
          className="btn--cta"
          buttonStyle={isDesktop}
        />
      </div>
      
    </div>
  );
};

export default ToggleLang;
