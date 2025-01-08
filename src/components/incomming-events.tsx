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
import { SelectEvent } from "@/db/schema";

export function IncommingEvents({ events }: { events: SelectEvent[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {events.map((product, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card className="flex h-full flex-col overflow-hidden">
              <div className="relative aspect-video w-full">
                <CldImage
                  key={product.id}
                  alt={product.title}
                  className="object-cover"
                  src={product.img}
                  fill
                />
              </div>
              <CardHeader className="grow">
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.date}</CardDescription>
                <CardDescription>{product.description}</CardDescription>
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
