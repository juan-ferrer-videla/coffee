"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectProduct } from "@/db/schema";
import { useDictionary } from "@/hooks/useDictionary";
import { useProductContext } from "@/hooks/useProduct";
import { currency } from "@/lib/utils";
import { ReactNode } from "react";
import { DecreaseButton, IncreaseButton } from "./product.client";

export const CartTable = ({ products }: { products: SelectProduct[] }) => {
  const store = useProductContext((state) => state.products);
  const total = useProductContext((state) => state.getTotal());
  const delivery = useProductContext((state) => state.delivery);
  const { product, price, quantity, cart_table_caption } = useDictionary();

  return (
    <Table>
      <TableCaption>{cart_table_caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">{product}</TableHead>
          <TableHead>{price}</TableHead>
          <TableHead>{quantity}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.reduce<ReactNode[]>((acc, { id, price, title }) => {
          if (store[id] > 0)
            acc.push(
              <TableRow key={id}>
                <TableCell className="font-medium">{title}</TableCell>
                <TableCell>{currency.format(price)}</TableCell>
                <TableCell className="flex w-full items-center gap-x-3">
                  <DecreaseButton id={id.toString()} />
                  <p>{store[id]}</p>
                  <IncreaseButton id={id.toString()} />
                </TableCell>
              </TableRow>,
            );
          return acc;
        }, [])}
        {delivery && total < 80000 && (
          <TableRow>
            <TableCell className="font-medium">Envio</TableCell>
            <TableCell>{currency.format(10000)}</TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">
            {currency.format(delivery && total < 80000 ? total + 10000 : total)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
