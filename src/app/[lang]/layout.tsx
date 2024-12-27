import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { locales, TLocale } from "@/i18n";
import { ToggleLang } from "@/components/toggle-lang";
import { LangProvider } from "@/providers/lang-provider";
import { getDictionary } from "@/get-dictionary";
import { User } from "@/components/user";
import { Cart } from "@/components/cart";
import { Separator } from "@/components/ui/separator";
import { Nav } from "@/components/nav";
import Link from "next/link";

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

  const images = {
    url: "https://juan-ferrer.vercel.app/linkedin.jpeg",
    width: 512,
    height: 512,
  };

  return {
    alternates: {
      canonical: `https://juan-ferrer.vercel.app/${lang}`,
      languages: {
        es: "https://juan-ferrer.vercel.app/es",
        en: "https://juan-ferrer.vercel.app/en",
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
    keywords: ["Juan Ferrer", "NextJS", "Front end Developer", "React"],
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
            <header className="container sticky top-0 z-50 mb-6 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:mb-8 md:mb-12">
              <div className="flex items-center justify-between border-b py-4">
                <Link href={"/"}>Coffee</Link>
                <Nav />
                <div className="flex items-center space-x-3">
                  <ToggleLang />
                  <ModeToggle />
                  <User />
                  <Cart />
                </div>
              </div>
            </header>
            <main className="container grow">{children}</main>
            <footer className="container pb-6">
              <Separator className="mb-6" />
            </footer>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
