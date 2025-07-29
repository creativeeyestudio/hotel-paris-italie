"use client";

import React, { useEffect, useState } from "react";
import MenuIcon from "../icons/MenuIcon";
import toggleReservePopup from "@/lib/toggleReservePopup";
import Icon from "../icons/Icon";

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
        <Icon type={"phone"} color="white" size={24} />
      </button>
      <button
        className="mobile-bar__reserve-btn"
        onClick={() => toggleReservePopup()}
      >
        Réserver en ligne
      </button>
    </div>
  ) : (
    <></>
  );
};

export default MobileBar;
