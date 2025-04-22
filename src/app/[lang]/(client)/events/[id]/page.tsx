import { getEvents } from "@/_actions/actions";
import { ContactButton } from "@/components/whatsapp-button";
import { SelectEvent } from "@/db/schema";
import { EventCardDesc } from "@/components/event-card-description";
import { getDictionary } from "@/get-dictionary";
import { TLocale } from "@/i18n";
import { Suspense } from "react";
import { NextEvents } from "@/components/next-events";
import { PastEvents } from "@/components/past-events";

const EventId = async (id: number) => {
  const events: SelectEvent[] = await getEvents();
  return events.find((event) => event.id === id);
};

interface EventDescProps {
  params: Promise<{ id: string; lang: TLocale }>;
}

export default async function EventDesc({ params }: EventDescProps) {
  const { id, lang } = await params;
  const Evntid = Number(id);
  const event = await EventId(Evntid);
  const dictionary = await getDictionary(lang);

  if (!event) {
    return <h1>Event not found</h1>;
  }

  return (
    <>
      <h1 className="mb-8 scroll-m-20 text-center font-serif text-4xl tracking-tight sm:mb-12 md:mb-16 lg:text-5xl xl:text-6xl">
        {event.title}
      </h1>
      <EventCardDesc key={event.id} {...event} />
      <div className="w-full">
        <ContactButton
          phoneNumber="+5491134698469"
          message="¡Hola! Estoy interesado/a en organizar un evento con ustedes."
        />
      </div>
      <h2 className="my-6 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">
        {dictionary.next_events}
      </h2>
      <Suspense>
        <NextEvents />
      </Suspense>

      <h2 className="my-6 scroll-m-20 font-serif text-2xl font-semibold tracking-tight">
        {dictionary.past_events}
      </h2>
      <Suspense>
        <PastEvents />
      </Suspense>
    </>
  );
}
