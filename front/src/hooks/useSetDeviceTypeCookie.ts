"use client";

import { useEffect } from "react";

export function useSetDeviceTypeCookie() {
  useEffect(() => {
    const width = window.innerWidth;

    const device = width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop";

    document.cookie = `deviceType=${device}; path=/; max-age=300`;
  }, []);
}
