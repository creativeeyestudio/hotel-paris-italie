"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const LoaderPageWatcher = () => {
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      const loaderPage = document.querySelector(".loader--page");
      loaderPage?.classList.replace("loader--open", "loader--close");
    }, 500);
  }, [pathname]);

  return null;
};

export default LoaderPageWatcher;
