import type { TProduct } from "@/context/store";
import { Count, DecreaseButton, IncreaseButton } from "./product.client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Product = ({ title, price, id, src, description }: TProduct) => {
  const currency = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });

  return (
    <Card className="overflow-hidden">
      <Image
        placeholder="blur"
        src={src}
        alt={title}
        className="aspect-video h-full w-full object-cover"
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <p>{currency.format(price)}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-x-1">
          <DecreaseButton id={id.toString()} />
          <Count id={id.toString()} />
          <IncreaseButton id={id.toString()} />
        </div>
      </CardContent>
    </Card>
  );
};
