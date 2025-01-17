import { getDictionary } from "@/get-dictionary";
import { TLocale } from "@/i18n";
import { BannerCarousel } from "@/components/banner-carousel";
import { RecommendedCarousel } from "@/components/recommended-products";
import { IncommingEvents } from "@/components/incomming-events";
import { AboutUsDescription } from "@/components/about-us-description";
import { AboutUsCard } from "@/components/about-us-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { CarouselSkeleton } from "@/components/carousel-skeleton";
import Image from "next/image";
import logo from "@/assets/cafeLogo.png";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;
  const { title, store } = await getDictionary(lang);
  const [firstPart, secondPart] = title.split(" ")

  return (
    <>
      <h1 className="flex items-center justify-center mb-8 scroll-m-20 text-center text-4xl font-extrabold tracking-tight sm:mb-12 md:mb-4 lg:text-5xl xl:text-6xl">
        {firstPart}
        <Image
            src={logo}
            alt="logo"
            width={120}
            height={120}
            className="mb-6"
          />
        {secondPart}
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
        <AboutUsDescription />
        <AboutUsCard />
      </section>
    </>
  );
}
