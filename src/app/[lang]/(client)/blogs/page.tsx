import { getDictionary } from "@/get-dictionary";
import { TLocale } from "@/i18n";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;
  const { blogs } = await getDictionary(lang);

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight lg:text-5xl xl:text-6xl">
          {blogs}
        </h1>
        <p className="mb-8 max-w-2xl scroll-m-20 text-lg font-light text-muted-foreground sm:mb-12 md:mb-16">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam facere
        </p>
      </div>
    </>
  );
}
