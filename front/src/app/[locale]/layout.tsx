import DeviceDetectorClient from "@/components/layout/DeviceDetectorClient";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBar from "@/components/layout/MobileBar";

import "@/styles/globals.css";

interface LayoutParams {
  locale: string;
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} dir="ltr">
      <body>
        <DeviceDetectorClient />
        <Header locale={locale} />
        <main>{children}</main>
        <MobileBar locale={locale} />
        <Footer locale={locale} />
      </body>
    </html>
  );
}
