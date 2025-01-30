import { getDictionary } from "@/get-dictionary";
import { TLocale } from "@/i18n";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignIn } from "@/components/sign-in";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
  searchParams: SearchParams;
}>) {
  const { lang } = await params;
  const { sign_in, sign_in_desc, sign_in_email, sign_in_login } = await getDictionary(lang);
  const { redirect } = await searchParams;

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-serif tracking-tight lg:text-5xl xl:text-6xl">
          {sign_in}
        </h1>
        <p className="mb-8 max-w-2xl scroll-m-20 text-lg font-light text-muted-foreground sm:mb-12 md:mb-16">
          {sign_in_desc}
        </p>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{sign_in_login}</CardTitle>
            <CardDescription>
              {sign_in_email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignIn
              variant={"default"}
              redirect={`/${lang}/${redirect ?? ""}`}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
