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
      <h1 className="mb-8 scroll-m-20 text-center text-4xl font-extrabold tracking-tight sm:mb-12 md:mb-16 lg:text-5xl xl:text-6xl">
        {title}
      </h1>
    </>
  );
}
