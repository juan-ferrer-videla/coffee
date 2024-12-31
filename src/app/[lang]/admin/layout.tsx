import { isAdmin } from "@/actions";
import { auth } from "@/auth";
import { ModeToggle } from "@/components/mode-toggle";
import { TLocale } from "@/i18n";
import { redirect } from "next/navigation";

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
  children: React.ReactNode;
}>) {
  const { lang } = await params;

  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect(`/${lang}/sign-in?redirect=admin`);

  const isAuthorized = await isAdmin(email);
  if (!isAuthorized) redirect(`/${lang}`);

  return (
    <>
      <header className="container sticky top-0 z-50 mb-6 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:mb-8 md:mb-12">
        <div className="flex items-center justify-between border-b py-4">
          <h1>Admin</h1>
          <div className="flex items-center space-x-3">
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className="container grow">{children}</main>
    </>
  );
}
