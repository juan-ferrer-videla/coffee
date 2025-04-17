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
  const {
    title,
    store,
    recommended_products,
    incomming_events,
    about_us,
    about_us_description,
  } = await getDictionary(lang);
  const [firstPart, secondPart] = title.split(" ");

  return (
    <>
      <h1 className="mb-8 flex scroll-m-20 flex-wrap items-center justify-center text-center font-serif text-4xl tracking-tight sm:mb-12 md:mb-4 lg:text-5xl xl:text-6xl">
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
        <h2 className="mb-4 scroll-m-20 text-2xl font-semibold font-serif tracking-tight">
          {recommended_products}
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
        <h2 className="mb-4 scroll-m-20 text-2xl font-semibold font-serif tracking-tight">
          {incomming_events}
        </h2>
        <Suspense fallback={<CarouselSkeleton />}>
          <IncommingEvents />
        </Suspense>
      </section>
      <section className="mb-6 sm:mb-10 md:mb-16">
        <h3 className="mb-4 scroll-m-20 text-center font-serif text-4xl tracking-tight sm:mb-6 md:mb-8 lg:text-5xl xl:text-6xl">
          {about_us}
        </h3>
        <p className="mx-auto mb-8 max-w-screen-lg text-center text-xl text-muted-foreground sm:mb-12 md:mb-16 lg:mb-24">
          {about_us_description}
        </p>
        <AboutUsCard />
      </section>
    </>
  );
}
