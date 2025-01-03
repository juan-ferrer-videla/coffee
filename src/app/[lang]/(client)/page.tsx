import { getProducts } from "@/actions";
import { getDictionary } from "@/get-dictionary";
import { TLocale } from "@/i18n";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CldImage } from "@/components/cld-image";
import { currency } from "@/lib/utils";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;
  const { title } = await getDictionary(lang);
  const products = await getProducts(1);

  return (
    <>
      <h1 className="mb-8 scroll-m-20 text-center text-4xl font-extrabold tracking-tight sm:mb-12 md:mb-16 lg:text-5xl xl:text-6xl">
        {title}
      </h1>
      <ul className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
        {products.map((product) => (
          <li key={product.title}>
            <Card className="overflow-hidden">
              <div className="relative aspect-video w-full">
                <CldImage
                  key={product.id}
                  alt={product.title}
                  className="object-cover"
                  src={product.img}
                  fill
                />
              </div>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
                <p>{currency.format(product.price)}</p>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
