// lib/useHandleOnClick.ts
"use client";

import { useCallback } from "react";
import { useShouldNavigateTo } from "./shouldNavigateTo";
import closeMainNav from "./closeMainNav";

export function useHandleNavClick() {
  const shouldNavigateTo = useShouldNavigateTo();

  const handleOnClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!shouldNavigateTo(href)) {
        e.preventDefault();
        const mainNav = document.querySelector(".nav");
        if (mainNav?.classList.contains("nav--open")) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          closeMainNav();
        }
        return;
      }

      const loaderPage = document.querySelector(".loader--page");
      if (loaderPage?.classList.contains("loader--close")) {
        loaderPage.classList.replace("loader--close", "loader--open");
      } else {
        loaderPage?.classList.add("loader--open");
      }

      closeMainNav();
    },
    [shouldNavigateTo],
  );

  return handleOnClick;
}
