import { isAdmin } from "@/_actions/actions";
import { Button } from "@/components/ui/button";
import { TLocale } from "@/i18n";
import Link from "next/link";
import { redirect } from "next/navigation";
import { adminLinks } from "./links";
import { getSession } from "@/_actions/auth";

export default async function Admin({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;

  const session = await getSession();
  const email = session?.user?.email;
  if (!email) redirect(`/${lang}/sign-in?redirect=admin`);

  const isAuthorized = await isAdmin(email);
  if (!isAuthorized) redirect(`/${lang}`);

  return (
    <>
      <h1 className="mb-10 text-center text-4xl font-extrabold uppercase tracking-tight md:mb-16 lg:mb-24 lg:text-5xl xl:text-6xl">
        Administrador
      </h1>
      <nav>
        <ul className="justify mx-auto grid max-w-screen-md gap-6 sm:grid-cols-2">
          {adminLinks.map(({ path, title }) => (
            <li key={path}>
              <Button asChild className="w-full">
                <Link href={`/es/admin${path}`}> {title}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
