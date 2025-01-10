import { getProducts } from "@/_actions/actions";
import { GridSkeleton } from "@/components/grid-skeleton";
import { Product } from "@/components/product";
import { getDictionary } from "@/get-dictionary";
import { TLocale } from "@/i18n";
import { Suspense } from "react";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;
  const { store, store_description } = await getDictionary(lang);

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight lg:text-5xl xl:text-6xl">
          {store}
        </h1>
        <p className="mb-8 max-w-2xl scroll-m-20 text-lg font-light text-muted-foreground sm:mb-12 md:mb-16">
          {store_description}
        </p>
      </div>
      <section className="pb-4 sm:pb-8 md:pb-12 lg:pb-16">
        <Suspense fallback={<GridSkeleton />}>
          <Products />
        </Suspense>
      </section>
    </>
  );
}

const Products = async () => {
  const products = await getProducts();
  return (
    <ul className="grid justify-center gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
      {products.map((product) => (
        <li key={product.title}>
          <Product {...product} />
        </li>
      ))}
    </ul>
  );
};
