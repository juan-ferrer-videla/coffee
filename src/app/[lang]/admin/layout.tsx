import { ModeToggle } from "@/components/mode-toggle";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
