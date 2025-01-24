"use client";

import { Product } from "@/components/product";
import { Input } from "@/components/ui/input";
import { SelectProduct } from "@/db/schema";
import { useDictionary } from "@/hooks/useDictionary";
import { Label } from "@radix-ui/react-label";
import { use, useState } from "react";

export const Products = ({
  productsPromise,
}: {
  productsPromise: Promise<SelectProduct[]>;
}) => {
  const products = use(productsPromise);
  const [query, setQuery] = useState("");

  const {find_your_product} = useDictionary()

  return (
    <>
      <div className="mb-6 grid w-full items-center gap-1.5 md:mb-10">
        <Label htmlFor="title">{find_your_product}</Label>
        <Input
          id="title"
          name="title"
          placeholder="Cafe..."
          required
          className="max-w-xs"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <ul className="grid w-full gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
        {products
          .filter(({ title }) =>
            title.toLowerCase().includes(query.toLowerCase()),
          )
          .map((product) => (
            <li key={product.title} className="flex w-full justify-center">
              <Product {...product} />
            </li>
          ))}
      </ul>
    </>
  );
};
