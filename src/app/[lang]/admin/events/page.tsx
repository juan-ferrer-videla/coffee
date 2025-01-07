import { getEvents, isAdmin } from "@/_actions/actions";
import { auth } from "@/auth";
import { TLocale } from "@/i18n";
import { redirect } from "next/navigation";
import { CreateEvent } from "./create-event";
import { Event } from "./event";

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

  const events = await getEvents();

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight lg:text-5xl xl:text-6xl">
          Eventos
        </h1>
        <p className="mb-8 max-w-2xl scroll-m-20 text-lg font-light text-muted-foreground sm:mb-12 md:mb-16">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam facere
        </p>
      </div>
      <CreateEvent />
      <ul className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
        {events.map((event) => (
          <li key={event.title} className="w-full">
            <Event {...event} />
          </li>
        ))}
      </ul>
    </>
  );
}
