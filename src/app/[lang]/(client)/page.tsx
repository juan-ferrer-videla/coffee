import { getProducts } from "@/_actions/actions";
import { getDictionary } from "@/get-dictionary";
import { TLocale } from "@/i18n";
import { BannerCarousel } from "@/components/banner-carousel";
import { RecommendedCarousel } from "@/components/recommended-products";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;
  const { title } = await getDictionary(lang);
  const products = await getProducts({ recommended: true });

  return (
    <>
      <h1 className="mb-8 scroll-m-20 text-center text-4xl font-extrabold tracking-tight sm:mb-12 md:mb-16 lg:text-5xl xl:text-6xl">
        {title}
      </h1>
      <section>
        <BannerCarousel />
      </section>
      <h2 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        Recommended Products:
      </h2>
      <RecommendedCarousel products={products} />
    </>
  );
}
