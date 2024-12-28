import { Count, DecreaseButton, IncreaseButton } from "./product.client";
import cogollo from "@/assets/cogollo.webp";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectProduct } from "@/db/schema";

export const Product = ({
  title,
  price,
  id,
  img,
  description,
}: SelectProduct) => {
  const currency = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });

  return (
    <Card className="overflow-hidden">
      <Image
        src={img || cogollo}
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
