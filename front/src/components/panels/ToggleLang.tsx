"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import toggleReservePopup from "@/lib/toggleReservePopup";

interface ToggleLangProps {
  currentLocale: string;
}

const ToggleLang: React.FC<ToggleLangProps> = ({ currentLocale }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locales = ["en", "fr", "es"];

  const handleLocaleChange = (targetLocale: string) => {
    if (targetLocale === currentLocale) return;

    const segments = pathname.split("/");
    segments[1] = targetLocale;
    const newPath = segments.join("/");

    router.push(newPath);
  };

  const bookingTexts: Record<string, string> = {
    fr: "Réserver une chambre",
    en: "Book a room",
    es: "Reservar una habitación",
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="flex items-center space-x-1">
        {locales.map((locale, index) => (
          <React.Fragment key={locale}>
            <button
              onClick={() => handleLocaleChange(locale)}
              disabled={locale === currentLocale}
              className={`hover:underline ${
                locale === currentLocale ? "font-bold" : ""
              }`}
            >
              {locale.toUpperCase()}
            </button>
            {index < locales.length - 1 && <span>-</span>}
          </React.Fragment>
        ))}
      </div>

      <span className="hidden md:block">|</span>

      <Button
        variant={"link"}
        className="hidden md:block lg:text-white px-1"
        onClick={() => toggleReservePopup()}
      >
        {bookingTexts[currentLocale]}
      </Button>
    </div>
  );
};

export default ToggleLang;
