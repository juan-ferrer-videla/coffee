import {
  Card,
  CardDescription,
  CardFooter,
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
import { currency } from "@/lib/utils";
import { getProducts } from "@/_actions/actions";

export async function RecommendedCarousel() {
  const products = await getProducts({ recommended: true });
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="mb-6 w-full"
    >
      <CarouselContent>
        {products.map((product, index) => (
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
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <p>{currency.format(product.price)}</p>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {products.length > 3 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}
