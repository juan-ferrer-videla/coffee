import { getProducts } from "@/_actions/actions";
import { Cart } from "@/components/cart";
import { MobileDrawer } from "@/components/mobile-drawer";
import { ModeToggle } from "@/components/mode-toggle";
import { Nav } from "@/components/nav";
import { ToggleLang } from "@/components/toggle-lang";
import { User } from "@/components/user";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getProducts();

  return (
    <>
      <header className="container sticky top-0 z-50 mb-6 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:mb-8 md:mb-12">
        <div className="flex items-center justify-between border-b py-4">
          <Link href={"/"}>Coffee</Link>
          <Nav className="hidden md:block" />
          <div className="flex items-center space-x-3">
            <ToggleLang />
            <ModeToggle />
            <User />
            <Cart products={products} />
            <MobileDrawer />
          </div>
        </div>
      </header>
      <main className="container grow">{children}</main>
    </>
  );
}
