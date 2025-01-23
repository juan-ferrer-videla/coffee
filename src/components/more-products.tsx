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
import { Count, DecreaseButton, IncreaseButton } from "./product.client";
import Link from "next/link";

export const MoreProducts = async ({
  currentProductId,
}: {
  currentProductId: string;
}) => {
  const products = await getProducts();

  const currentProduct = Number(currentProductId)

  const filteredProducts = products.filter(
    (product) => product.id !== currentProduct
  );

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="mb-6 w-full"
    >
      <CarouselContent>
        {filteredProducts
          .sort(() => Math.random() - 0.5)
          .map((product) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="flex h-full flex-col overflow-hidden">
                <Link href={`/products/${product.id}`} key={product.id}>
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
                    <CardDescription className="line-clamp-2">
                      {product.description}
                    </CardDescription>
                    <p>{currency.format(product.price)}</p>
                  </CardHeader>
                </Link>
                <CardFooter>
                  <div className="flex items-center gap-x-1">
                    <DecreaseButton id={product.id.toString()} />
                    <Count id={product.id.toString()} />
                    <IncreaseButton id={product.id.toString()} />
                  </div>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
      </CarouselContent>
      {products.length > 3 && (
        <>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </>
      )}
    </Carousel>
  );
};
