import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

interface LayoutParams {
  locale: string;
}

export default async function RootLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
}) {
  const { locale } = await params;
  
  return (
    <html lang={locale} dir="ltr">
      <body>
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
