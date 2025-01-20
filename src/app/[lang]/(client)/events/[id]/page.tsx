import { getEvents } from "@/_actions/actions";
import { ContactButton } from "@/components/whatsapp-button";
import { SelectEvent } from "@/db/schema";
import { EventCardDesc } from "@/components/event-card-description";

const EventId = async (id: number) => {
  const events: SelectEvent[] = await getEvents();
  return events.find((event) => event.id === id);
};

interface EventDescProps {
  params: Promise<{ id: string; lang: string }>;
}

export default async function EventDesc({ params }: EventDescProps) {
  const { id } = await params;
  const Evntid = Number(id);
  const event = await EventId(Evntid);

  if (!event) {
    return <h1>Event not found</h1>;
  }

  return (
    <>
      <h1 className="mb-8 scroll-m-20 text-center text-4xl font-extrabold tracking-tight sm:mb-12 md:mb-16 lg:text-5xl xl:text-6xl">
        {event.title}
      </h1>
      <EventCardDesc key={event.id} {...event} />
      <div>
        <ContactButton
          phoneNumber="+34643027559"
          message="¡Hola! Estoy interesado/a en organizar un evento con ustedes."
        />
      </div>
    </>
  );
}
