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
import { products, useStore } from "@/context/store";
import { useDictionary } from "@/hooks/useDictionary";
import { ReactNode } from "react";

export const CartTable = () => {
  const currency = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });
  const store = useStore((state) => state.products);
  const total = useStore((state) => state.getTotal());
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
                <TableCell>{price}</TableCell>
                <TableCell>{store[id]}</TableCell>
              </TableRow>,
            );
          return acc;
        }, [])}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{currency.format(total)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
