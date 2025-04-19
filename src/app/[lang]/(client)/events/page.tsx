import { TLocale } from "@/i18n";
import { getDictionary } from "@/get-dictionary";
import { Suspense } from "react";
import { NextEvents } from "@/components/next-events";
import { PastEvents } from "@/components/past-events";
import { CarouselSkeleton } from "@/components/carousel-skeleton";
import { ContactButton } from "@/components/whatsapp-button";

export default async function Events({
  params,
}: Readonly<{ params: Promise<{ lang: TLocale }> }>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <h1 className="mb-8 text-center font-serif text-4xl tracking-tight sm:mb-12 md:mb-16 lg:text-5xl xl:text-6xl">
        {dictionary.events}
      </h1>

      {/* ACA CUANDO NOS PASEN EL BANNER */}
      {/* <Image
            src={banner}
            alt="banner"
            className="w-full rounded-2xl object-cover xl:h-96"
            /> */}
      {/* Cuando nos pasen la descripcion real la cambiamos. */}

      <p className="mx-auto my-4 max-w-screen-lg text-center text-xl text-muted-foreground sm:my-12 md:my-16 lg:my-12">
        {dictionary.events_description}
      </p>

      <h2 className="my-6 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">
        {dictionary.next_events}
      </h2>
      <Suspense fallback={<CarouselSkeleton />}>
        <NextEvents />
      </Suspense>
      
      <h2 className="my-6 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">
        {dictionary.past_events}
      </h2>
      <Suspense fallback={<CarouselSkeleton />}>
        <PastEvents />
      </Suspense>
      <div className="w-full">
        <ContactButton
          phoneNumber="+5491134698469"
          message="¡Hola! Estoy interesado/a en organizar un evento con ustedes."
        />
      </div>
    </>
  );
}
