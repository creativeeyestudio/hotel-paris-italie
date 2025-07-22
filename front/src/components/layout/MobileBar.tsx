"use client";

import React, { useEffect, useState } from "react";
import MenuIcon from "../icons/MenuIcon";
import { Phone } from "lucide-react";

interface MobileBarProps {
  locale: string;
}

const MobileBar: React.FC<MobileBarProps> = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <div className="mobile-bar">
      <MenuIcon mobile classes="mobile-bar__nav-btn" />
      <button className="mobile-bar__call-btn">
        <Phone></Phone>
      </button>
      <button className="mobile-bar__reserve-btn">Réserver en ligne</button>
    </div>
  ) : (
    <></>
  );
};

export default MobileBar;
