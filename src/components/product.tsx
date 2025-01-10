import { Count, DecreaseButton, IncreaseButton } from "./product.client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectProduct } from "@/db/schema";
import { CldImage } from "./cld-image";
import { currency } from "@/lib/utils";

export const Product = ({
  title,
  price,
  id,
  img,
  description,
}: SelectProduct) => {
  return (
    <Card className="flex h-full max-w-sm flex-col overflow-hidden">
      <div className="relative aspect-video w-full">
        <CldImage
          key={id}
          alt={title}
          className="object-cover"
          src={img}
          fill
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <p>{currency.format(price)}</p>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col items-start justify-end gap-4">
        <div className="flex items-center gap-x-1">
          <DecreaseButton id={id.toString()} />
          <Count id={id.toString()} />
          <IncreaseButton id={id.toString()} />
        </div>
      </CardContent>
    </Card>
  );
};
