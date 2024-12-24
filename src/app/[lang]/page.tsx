import { getDictionary } from "@/get-dictionary";
import { TLocale } from "@/i18n";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;
  const { title } = await getDictionary(lang);

  return <h1>{title}</h1>;
}
