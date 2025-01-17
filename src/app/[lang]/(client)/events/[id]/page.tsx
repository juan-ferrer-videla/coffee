import { getEvents } from "@/_actions/actions";
import { ContactButton } from "@/components/whatsapp-button";
import { SelectEvent } from "@/db/schema";
import { EventCardDesc } from "@/components/event-card-description";

const EventId = async (id: number) => {
  const events: SelectEvent[] = await getEvents();
  return events.find((event) => event.id === id);
};

// Define las interfaces para las props
interface EventDescProps {
  params: Promise<{ id: string; lang: string }>; // Aquí agregamos 'lang' junto con 'id'
}

export default async function EventDesc({ params }: EventDescProps) {
  // Desestructuramos el objeto params y esperamos su resolución
  const { id, lang } = await params;
  const Evntid = await Number(id);
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
