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
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
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
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {events.length > 3 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}
