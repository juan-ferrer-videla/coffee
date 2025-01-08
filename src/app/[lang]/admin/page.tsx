import { isAdmin } from "@/_actions/actions";
import { auth } from "@/auth";
import { TLocale } from "@/i18n";
import { redirect } from "next/navigation";

export default async function Admin({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;

  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect(`/${lang}/sign-in?redirect=admin`);

  const isAuthorized = await isAdmin(email);
  if (!isAuthorized) redirect(`/${lang}`);

  return (
    <h1 className="text-4xl font-extrabold uppercase tracking-tight lg:text-5xl xl:text-6xl">
      Administrador
    </h1>
  );
}
