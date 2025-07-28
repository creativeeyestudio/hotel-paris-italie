import DeviceDetectorClient from "@/components/layout/DeviceDetectorClient";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBar from "@/components/layout/MobileBar";
import ReservePopup from "@/components/layout/ReservePopup";

import { Playfair_Display, Raleway } from "next/font/google";

import "@/styles/globals.css";
import "@/styles/main.scss";
import LenisProvider from "@/components/layout/LenisProvider";
import LoaderSite from "@/components/layout/LoaderSite";

interface LayoutParams {
  locale: string;
}

const fontBody = Raleway({
  subsets: ["latin"],
});
const fontTitle = Playfair_Display({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
}) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${fontBody.className} ${fontTitle.className}`}
    >
      <body>
        <LenisProvider />
        <DeviceDetectorClient />
        <LoaderSite />
        <Header locale={locale} />
        <ReservePopup></ReservePopup>
        <main>{children}</main>
        <MobileBar locale={locale} />
        <Footer locale={locale} />
      </body>
    </html>
  );
}
