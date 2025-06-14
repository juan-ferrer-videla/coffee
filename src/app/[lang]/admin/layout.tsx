import { isAdmin } from "@/_actions/actions";
import { ModeToggle } from "@/components/mode-toggle";
import { TLocale } from "@/i18n";
import { redirect } from "next/navigation";
import { Nav } from "./nav";
import { Providers } from "@/providers/tanstack-query";
import { MobileDrawer } from "./mobile-drawer";
import { getSession } from "@/_actions/auth";

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: TLocale }>;
}>) {
  return (
    <Providers>
      <AdminLayout params={params}>{children}</AdminLayout>
    </Providers>
  );
}

async function AdminLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
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
      <header className="container sticky top-0 z-50 mb-6 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:mb-8 md:mb-12">
        <div className="flex items-center justify-between border-b py-4">
          <h1>Coffee</h1>

          <Nav />
          <div className="flex items-center space-x-3">
            <ModeToggle />
            <MobileDrawer />
          </div>
        </div>
      </header>
      <main className="container grow">{children}</main>
    </>
  );
}
