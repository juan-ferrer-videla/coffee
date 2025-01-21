import { getDictionary } from "@/get-dictionary";
import { TLocale } from "@/i18n";
import { BannerCarousel } from "@/components/banner-carousel";
import { RecommendedCarousel } from "@/components/recommended-products";
import { IncommingEvents } from "@/components/incomming-events";
import { AboutUsCard } from "@/components/about-us-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { CarouselSkeleton } from "@/components/carousel-skeleton";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;
  const { title, store } = await getDictionary(lang);
  const [firstPart, secondPart] = title.split(" ");

  return (
    <>
      <h1 className="mb-8 flex scroll-m-20 flex-wrap items-center justify-center text-center text-4xl font-extrabold tracking-tight sm:mb-12 md:mb-4 lg:text-5xl xl:text-6xl">
        <span>{firstPart}</span>
        <Image
          src={logo}
          alt="logo"
          width={120}
          height={120}
          className="hidden dark:invert sm:mb-6 sm:inline"
        />
        <span>{secondPart}</span>
      </h1>

      <section>
        <BannerCarousel />
      </section>
      <section className="mb-6 sm:mb-10 md:mb-16">
        <h2 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
          Recommended Products:
        </h2>

        <Suspense fallback={<CarouselSkeleton />}>
          <RecommendedCarousel />
        </Suspense>
        <ul></ul>
        <Button asChild>
          <Link href={`/${lang}/store`}>
            {store} <ArrowRight />
          </Link>
        </Button>
      </section>
      <section className="mb-6 sm:mb-10 md:mb-16">
        <h2 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
          Incomming Events:
        </h2>
        <Suspense fallback={<CarouselSkeleton />}>
          <IncommingEvents />
        </Suspense>
      </section>
      <section className="mb-6 sm:mb-10 md:mb-16">
        <h3 className="mb-4 scroll-m-20 text-center text-4xl font-extrabold tracking-tight sm:mb-6 md:mb-8 lg:text-5xl xl:text-6xl">
          About Us
        </h3>
        <p className="mx-auto mb-8 max-w-screen-lg text-center text-xl text-muted-foreground sm:mb-12 md:mb-16 lg:mb-24">
          Somos un nuevo concepto de “CAFÉ DE EXCELENCIA” en Argentina con más
          de 15 años de experiencia en recorrido de fincas tradicionales
          cafeteras colombianas, brasileras, bolivianas y peruanas. Aprendiendo
          técnicas de filtrado y cata en la zona central y norte de la selva
          peruana con capacitaciones en fertilización, recolección y selección
          de granos (“Pos cosecha”); variadas técnicas de secado. Experiencia en
          comercialización exterior de granos a diferentes sitios como TAIWAN;
          CHINA; ESPAÑA; CHILE. Nuestra materia prima posee un valor superior a
          89 puntos en taza. - PREMIUM COFFEE / HEALTHY LINE / MEDICAL COFFEE -
        </p>
        <AboutUsCard />
      </section>
    </>
  );
}
