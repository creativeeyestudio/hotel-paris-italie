import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "fr", "es", "it", "de"];
const defaultLocale = "fr";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostWithoutWww = (request.headers.get("host") ?? "").replace(
    /^www\./,
    "",
  );
  const deviceType = request.cookies.get("deviceType")?.value || "desktop";

  if (pathname === "/") {
    const acceptLang = request.headers.get("accept-language");
    const preferredLocale =
      acceptLang?.split(",")[0].split("-")[0] ?? defaultLocale;
    const locale = locales.includes(preferredLocale)
      ? preferredLocale
      : defaultLocale;

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;

    const redirectResponse = NextResponse.redirect(url);
    redirectResponse.headers.set("x-website", hostWithoutWww);
    redirectResponse.headers.set("x-device-type", deviceType);
    return redirectResponse;
  }

  const res = NextResponse.next();
  res.headers.set("x-website", hostWithoutWww);
  res.headers.set("x-device-type", deviceType);

  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
