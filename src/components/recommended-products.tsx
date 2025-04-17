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
import { currency } from "@/lib/utils";
import { getProducts } from "@/_actions/actions";
import Link from "next/link";

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
        {products.map((product) => (
          <CarouselItem key={product.id} className="sm:basis-1/2 lg:basis-1/3">
            <Card className="flex h-full flex-col overflow-hidden">
              <Link href={`/products/${product.id}`} key={product.id}>
                <div className="relative aspect-video w-full">
                  <CldImage
                    key={product.id}
                    alt={product.title}
                    className="object-cover"
                    src={product.img}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardHeader className="grow">
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                  <p>{currency.format(product.price)}</p>
                </CardHeader>
              </Link>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {products.length > 3 && (
        <>
          <CarouselPrevious className="hidden lg:inline-flex" />
          <CarouselNext className="hidden lg:inline-flex" />
        </>
      )}
    </Carousel>
  );
}
