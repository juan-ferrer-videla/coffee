import { getProducts, getUser } from "@/_actions/actions";
import { Cart } from "@/components/cart";
import { MobileDrawer } from "@/components/mobile-drawer";
import { ModeToggle } from "@/components/mode-toggle";
import { Nav } from "@/components/nav";
import { ToggleLang } from "@/components/toggle-lang";
import { User } from "@/components/user";
import Link from "next/link";
import logo from "@/assets/cafeLogo.png";
import Image from "next/image";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getProducts();
  const user = await getUser();

  return (
    <>
      <header className="container sticky top-0 z-50 mb-6 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:mb-8 md:mb-12">
        <div className="flex items-center justify-between border-b py-4">
          <Link href={"/"}>
            <span className="hidden md:inline">UniversoCoffee.ar</span>
            <Image
              src={logo}
              alt="UniversoCoffee.ar logo"
              className="h-auto w-12 md:hidden"
            />
          </Link>

          <Nav className="hidden md:block" />
          <div className="flex items-center space-x-3">
            <ToggleLang />
            <ModeToggle />
            <User />
            {user && <Cart products={products} user={user} />}
            <MobileDrawer />
          </div>
        </div>
      </header>
      <main className="container grow">{children}</main>
    </>
  );
}
