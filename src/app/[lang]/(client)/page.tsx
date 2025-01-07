import { getEvents, getProducts } from "@/_actions/actions";
import { getDictionary } from "@/get-dictionary";
import { TLocale } from "@/i18n";
import { BannerCarousel } from "@/components/banner-carousel";
import { RecommendedCarousel } from "@/components/recommended-products";
import { IncommingEvents } from "@/components/incomming-events";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;
  const [products, events, { title }] = await Promise.all([
    getProducts({ recommended: true }),
    getEvents(),
    getDictionary(lang),
  ]);

  return (
    <>
      <h1 className="mb-8 scroll-m-20 text-center text-4xl font-extrabold tracking-tight sm:mb-12 md:mb-16 lg:text-5xl xl:text-6xl">
        {title}
      </h1>
      <section>
        <BannerCarousel />
      </section>
      <section className="mb-6 sm:mb-10 md:mb-16">
        <h2 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
          Recommended Products:
        </h2>
        <RecommendedCarousel products={products} />
      </section>
      <section>
        <h2 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
          Incomming Events:
        </h2>
        <IncommingEvents events={events} />
      </section>
    </>
  );
}
