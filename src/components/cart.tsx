"use client";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { CartTable } from "./cart-table";
import { useDictionary } from "@/hooks/useDictionary";
import { useProductContext } from "@/hooks/useProduct";
import { SelectProduct, SelectUser } from "@/db/schema";
import { Buy } from "./buy";
import { useState } from "react";

const Count = () => {
  const length = useProductContext((state) => state.getLength());
  if (length < 1) return null;

  return (
    <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded bg-foreground px-1 font-mono text-xs text-background">
      {length}
    </div>
  );
};

export const Cart = ({
  products,
  user,
}: {
  products: SelectProduct[];
  user: SelectUser;
}) => {
  const { cart_description, cart } = useDictionary();
  const clearCart = useProductContext((state) => state.clearCart);
  const total = useProductContext((state) => state.getTotal());
  const [open, setOpen] = useState(false);

  const close = () => {
    clearCart();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"} className="relative">
          <Count />
          <ShoppingCart />
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>{cart}</SheetTitle>
          <SheetDescription>{cart_description}</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <CartTable products={products} />
        </div>
        <div>
          <Buy close={close} disabled={total === 0} user={user} />{" "}
        </div>
      </SheetContent>
    </Sheet>
  );
};
