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

export async function IncommingEvents() {
  const events = await getEvents();

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {events.map((event, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 transition-transform duration-300 hover:scale-95">
            <Link href={`/events/${event.id}`} key={event.id}>
            <Card className="flex h-full flex-col overflow-hidden">
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
                <CardDescription>{event.date}</CardDescription>
                <CardDescription className="line-clamp-2">{event.description}</CardDescription>
              </CardHeader>
            </Card>
            </Link>
          </CarouselItem>    
        ))}
      </CarouselContent>
      {events.length > 3 && (
        <>
          <CarouselPrevious className="invisible sm:visible"/>
          <CarouselNext  className="invisible sm:visible"/>
        </>
      )}
    </Carousel>
  );
}
