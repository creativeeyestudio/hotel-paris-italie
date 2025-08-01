"use client";

import { useEffect, useState } from "react";
import UseAnimations from "react-useanimations";
import menu2 from "react-useanimations/lib/menu2";

const label: Record<string, [string, string]> = {
  fr: ["menu", "fermer"],
  en: ["menu", "close"],
  es: ["menú", "cerrar"],
};

const MenuIcon = ({ locale = "fr", classes = "", mobile = false }) => {
  const [isActive, setIsActive] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => setIsLargeScreen(mediaQuery.matches);

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  function setupNavToggle(): void {
    const nav = document.querySelector(".nav");
    if (!nav) return;

    nav.classList.toggle("nav--open", !isActive);
    nav.classList.toggle("nav--close", isActive);
  }

  return (
    <UseAnimations
      id={mobile ? "toggle-nav-btn-mobile" : "toggle-nav-btn"}
      animation={menu2}
      size={36}
      strokeColor={isLargeScreen || mobile ? "white" : "black"}
      reverse={isActive}
      render={(eventProps, animationProps) => (
        <button
          {...eventProps}
          onClick={(e) => {
            eventProps.onClick?.(e);
            setIsActive((prev) => !prev);
            setupNavToggle();
          }}
          className={`${mobile ? "flex" : "hidden md:flex md:items-center"} md:gap-[1rem] ${classes}`}
        >
          <div {...animationProps} />
          <span className="hidden lg:block relative leading-[1] h-[1em]">
            <span
              className={`
                                pointer-events-none inset-0 transition-all duration-1000 ease-in-out
                                ${isActive ? "translate-x-full opacity-0 absolute" : "translate-x-0 opacity-100"}
                            `}
            >
              {label[locale]?.[0]}
            </span>
            <span
              className={`
                                pointer-events-none inset-0 transition-all duration-1000 ease-in-out duration
                                ${isActive ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 absolute"}
                            `}
            >
              {label[locale]?.[1]}
            </span>
          </span>
        </button>
      )}
    />
  );
};

export default MenuIcon;
