"use client";

import { SelectProduct } from "@/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { CldImage } from "next-cloudinary";
import { Count, DecreaseButton, IncreaseButton } from "./product.client";
import { currency } from "@/lib/utils";

export const ProductDesc = ({
  id,
  title,
  description,
  img,
  price,
}: SelectProduct) => {
  const descriptionArray = description?.replace(/\r/g, "").split("\n");

  return (
    <main className="m-4 flex flex-col gap-6 lg:mb-8 lg:flex-row">
      <div className="w-full lg:w-1/2">
        <CldImage
          src={img}
          alt="Product Image"
          className="w-full rounded-lg object-cover"
          width="500"
          height="500"
          style={{ aspectRatio: "500/500", objectFit: "cover" }}
        />
      </div>
      <div className="w-full lg:w-1/2">
        <Card>
          <CardContent className="p-4">
            <h2 className="mb-2 text-3xl font-bold">{title}</h2>
            <div className="mb-4">
              {descriptionArray &&
                descriptionArray.length > 0 &&
                descriptionArray.map((description, i) => {
                  if (description === "") return <br key={i} />;
                  return <p key={i}>{description}</p>;
                })}
            </div>
            <p className="mb-4 text-2xl font-bold">{currency.format(price)}</p>
            <div className="flex items-center justify-end gap-x-1 p-2">
              <DecreaseButton id={id.toString()} />
              <Count id={id.toString()} />
              <IncreaseButton id={id.toString()} />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
