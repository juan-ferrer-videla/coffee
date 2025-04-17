import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CldImage } from "./cld-image";
import { getEvents } from "@/_actions/actions";
import Link from "next/link";
import { getParseDate } from "@/lib/utils";

export async function IncommingEvents() {
  const events = (await getEvents()).filter(
    ({ date }) => date > new Date().getTime(),
  );
  if (events.length < 1)
    return <p>Por el momento no hay eventos programados</p>;

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {events.map((event, index) => (
          <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
            <Link href={`/events/${event.id}`} key={event.id}>
              <Card className="flex h-full flex-col overflow-hidden transition-transform duration-300 hover:scale-95">
                <div className="relative aspect-video w-full">
                  <CldImage
                    key={event.id}
                    alt={event.title}
                    className="object-cover"
                    src={event.img}
                    fill
                  />
                </div>
                <CardHeader className="grow">
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{getParseDate(event.date)}</CardDescription>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      {events.length > 3 && (
        <>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </>
      )}
    </Carousel>
  );
}
