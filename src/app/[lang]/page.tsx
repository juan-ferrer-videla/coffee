import { Product } from "@/components/product";
import { products } from "@/context/store";
import { getDictionary } from "@/get-dictionary";
import { TLocale } from "@/i18n";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;
  const { title } = await getDictionary(lang);

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold uppercase tracking-tight lg:text-5xl xl:text-6xl">
        {title}
      </h1>
      <section>
        <ul>
          {products.map((product) => (
            <li key={product.title}>
              <Product {...product} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
