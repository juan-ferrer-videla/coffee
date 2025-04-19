import { getParsedDate } from "@/lib/utils";
import { getEvents } from "@/_actions/actions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { CldImage } from "./cld-image";

export const getUpcomingEvents = (
  events: Awaited<ReturnType<typeof getEvents>>,
) => {
  const now = Date.now();

  return events
    .filter((event) => event.date > now)
    .sort((a, b) => a.date - b.date); // más cercanos primero
};

export const NextEvents = async () => {
  const events = await getEvents();
  const upcomingEvents = getUpcomingEvents(events);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="mb-6 w-full"
    >
      <CarouselContent>
        {upcomingEvents.map((event) => (
          <CarouselItem key={event.id} className="sm:basis-1/2 lg:basis-1/3">
            <Card className="flex h-full flex-col overflow-hidden">
              <Link href={`/events/${event.id}`} key={event.id}>
                <div className="relative aspect-video w-full">
                  <CldImage
                    key={event.id}
                    alt={event.title}
                    className="object-cover"
                    src={event.img}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardHeader className="grow">
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{getParsedDate(event.date)}</CardDescription>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
              </Link>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {events.length > 3 && (
        <>
          <CarouselPrevious className="hidden lg:inline-flex" />
          <CarouselNext className="hidden lg:inline-flex" />
        </>
      )}
    </Carousel>
  );
};
