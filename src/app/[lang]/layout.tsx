import type { Metadata } from "next";
import "../globals.css";
import { Lexend_Giga, Geist_Mono, Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { locales, TLocale } from "@/i18n";
import { LangProvider } from "@/providers/lang-provider";
import { getDictionary } from "@/get-dictionary";
import { ProductsProvider } from "@/providers/products-provider";
import { getProducts } from "@/_actions/actions";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { TikTok } from "@/components/icons/tiktok";
import Link from "next/link";

const LexendSansSerif = Lexend_Giga({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const MontserratSans = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  const { follow, address, contact, privacy, privacy_link, terms_link } =
    dictionary;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          `${LexendSansSerif.variable} ${MontserratSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`,
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
                <div className="my-6 flex flex-col justify-around gap-6 text-center md:my-10 md:flex-row md:text-start lg:my-14">
                  <div>
                    <h3 className="mb-1 scroll-m-20 text-xl font-semibold tracking-tight md:mb-3">
                      {follow}
                    </h3>
                    <nav>
                      <ul className="flex items-center justify-center space-x-3 md:justify-start">
                        <li>
                          <a
                            href="https://www.facebook.com/profile.php?id=61569930794954"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Facebook className="stroke-muted-foreground transition-colors hover:stroke-foreground" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.instagram.com/universocoffee.ar"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Instagram className="stroke-muted-foreground transition-colors hover:stroke-foreground" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.youtube.com/@ucoffeear"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Youtube className="stroke-muted-foreground transition-colors hover:stroke-foreground" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.tiktok.com/@universo.coffee.ar"
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
                      San Telmo, CABA.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Buenos Aires – Argentina.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-1 scroll-m-20 text-xl font-semibold tracking-tight md:mb-3">
                      {contact}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      universo.coffee@gmail.com
                    </p>
                    <p className="text-sm text-muted-foreground">
                      +54 11-3469-8469
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-1 scroll-m-20 text-xl font-semibold tracking-tight md:mb-3">
                      {privacy}
                    </h3>
                    <div className="grid">
                      <Link
                        href={"/privacy-policy"}
                        className="text-sm text-muted-foreground"
                      >
                        {privacy_link}
                      </Link>
                      <Link
                        href={"/terms"}
                        className="text-sm text-muted-foreground"
                      >
                        {terms_link}
                      </Link>
                    </div>
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
