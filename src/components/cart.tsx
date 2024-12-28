"use client";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { CartTable } from "./cart-table";
import { useDictionary } from "@/hooks/useDictionary";
import { useProductContext } from "@/hooks/useProduct";
import { SelectProduct } from "@/db/schema";

const Count = () => {
  const length = useProductContext((state) => state.getLength());
  if (length < 1) return null;

  return (
    <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded bg-foreground px-1 font-mono text-xs text-background">
      {length}
    </div>
  );
};

export const Cart = ({ products }: { products: SelectProduct[] }) => {
  const { cart_description } = useDictionary();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"} className="relative">
          <Count />
          <ShoppingCart />
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tus productos</SheetTitle>
          <SheetDescription>{cart_description}</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <CartTable products={products} />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Comprar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
