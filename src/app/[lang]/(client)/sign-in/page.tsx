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
  const { sign_in } = await getDictionary(lang);
  const { redirect } = await searchParams;

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight lg:text-5xl xl:text-6xl">
          {sign_in}
        </h1>
        <p className="mb-8 max-w-2xl scroll-m-20 text-lg font-light text-muted-foreground sm:mb-12 md:mb-16">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam facere
        </p>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
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
