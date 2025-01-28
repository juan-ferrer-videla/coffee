import { getProducts } from "@/_actions/actions";
import { auth } from "@/auth";
import { GridSkeleton } from "@/components/grid-skeleton";

import { getDictionary } from "@/get-dictionary";
import { TLocale } from "@/i18n";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Products } from "./products";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;
  const { store, store_description } = await getDictionary(lang);
  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect(`/${lang}/sign-in?redirect=store`);
  const productsPromise = getProducts();

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="font-serif text-4xl tracking-tight lg:text-5xl xl:text-6xl">
          {store}
        </h1>
        <p className="mb-8 max-w-2xl scroll-m-20 text-lg font-light text-muted-foreground sm:mb-12 md:mb-16">
          {store_description}
        </p>
      </div>
      <section className="pb-4 sm:pb-8 md:pb-12 lg:pb-16">
        <Suspense fallback={<GridSkeleton />}>
          <Products productsPromise={productsPromise} />
        </Suspense>
      </section>
    </>
  );
}
