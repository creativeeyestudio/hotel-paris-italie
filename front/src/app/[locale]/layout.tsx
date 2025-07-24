import DeviceDetectorClient from "@/components/layout/DeviceDetectorClient";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBar from "@/components/layout/MobileBar";
import ReservePopup from "@/components/layout/ReservePopup";

import { Playfair_Display, Raleway } from "next/font/google";

import "@/styles/globals.css";
import "@/styles/main.scss";

interface LayoutParams {
  locale: string;
}

const fontBody = Raleway();
const fontTitle = Playfair_Display();

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
        <DeviceDetectorClient />
        <Header locale={locale} />
        <ReservePopup></ReservePopup>
        <main>{children}</main>
        <MobileBar locale={locale} />
        <Footer locale={locale} />
      </body>
    </html>
  );
}
