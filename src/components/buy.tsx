"use client";

import { useProductContext } from "@/hooks/useProduct";
import { Button } from "./ui/button";
import { buy } from "@/actions";
import { useDictionary } from "@/hooks/useDictionary";

export const Buy = ({ close }: { close: () => void }) => {
  const { buy: title } = useDictionary();
  const productsMap = useProductContext((state) => state.products);
  const products = Object.entries(productsMap).map(([productId, quantity]) => ({
    productId: parseInt(productId),
    quantity,
  }));

  return (
    <form
      action={async (formData: FormData) => {
        await buy(formData);
        close();
      }}
    >
      <input
        type="hidden"
        name="rawProducts"
        value={JSON.stringify(products)}
      />
      <Button>{title}</Button>
    </form>
  );
};
