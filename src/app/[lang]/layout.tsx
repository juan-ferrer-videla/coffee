import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { locales, TLocale } from "@/i18n";
import { LangProvider } from "@/providers/lang-provider";
import { getDictionary } from "@/get-dictionary";
import { ProductsProvider } from "@/providers/products-provider";
import { getProducts } from "@/actions";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { TikTok } from "@/components/icons/tiktok";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: TLocale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { description, title } = await getDictionary(lang);
  const baseUrl = "https://universo-coffee.vercel.app";

  const images = {
    url: `${baseUrl}/universo-coffee.png`,
    width: 128,
    height: 128,
  };

  return {
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
      },
    },
    title,
    description,
    twitter: {
      title,
      description,
      images,
    },
    openGraph: {
      title,
      description,
      images,
      locale: lang,
      type: "website",
    },
    creator: "Juan Ferrer",
    keywords: ["coffee"],
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const products = await getProducts();
  const { follow, address } = dictionary;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`,
          "font-sans",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LangProvider dictionary={dictionary}>
            <ProductsProvider products={products}>
              {children}
              <footer className="container mt-6 md:mt-12 lg:mt-16">
                <div className="border-t" />
                <div className="my-6 grid gap-6 text-center md:my-10 md:grid-cols-3 md:text-start lg:my-14">
                  <div>
                    <h3 className="mb-2 scroll-m-20 text-xl font-semibold tracking-tight md:mb-3">
                      {follow}
                    </h3>
                    <nav>
                      <ul className="flex items-center justify-center space-x-3 md:justify-start">
                        <li>
                          <a
                            href="https://www.facebook.com/universo.coffe?_rdc=1&_rdr"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Facebook className="stroke-muted-foreground transition-colors hover:stroke-foreground" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.instagram.com/universo.coffeeok"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Instagram className="stroke-muted-foreground transition-colors hover:stroke-foreground" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.youtube.com/@Universo.Coffee"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Youtube className="stroke-muted-foreground transition-colors hover:stroke-foreground" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.tiktok.com/@universo.coffee"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <TikTok className="stroke-muted-foreground transition-colors hover:stroke-foreground" />
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div>
                    <h3 className="mb-1 scroll-m-20 text-xl font-semibold tracking-tight md:mb-3">
                      {address}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Thames 2326 Palermo Caba.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Buenos Aires – Argentina.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-1 scroll-m-20 text-xl font-semibold tracking-tight md:mb-3">
                      Representante
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Rafael Mancini
                    </p>
                    <p className="text-sm text-muted-foreground">
                      CEO Co-Founder & Coffee Máster.
                    </p>
                  </div>
                </div>
              </footer>
            </ProductsProvider>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
