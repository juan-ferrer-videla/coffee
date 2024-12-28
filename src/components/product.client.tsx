"use client";

import { Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { useCallback } from "react";
import { useProductContext } from "@/hooks/useProduct";

export const DecreaseButton = ({ id }: { id: string }) => {
  const count = useProductContext((state) => state.products[id]);
  const decrease = useProductContext((state) => state.removeProduct);

  const handleDecrease = useCallback(() => {
    decrease(id);
  }, [decrease, id]);

  return (
    <Button disabled={count < 1} onClick={handleDecrease} size={"icon"}>
      <Minus />
    </Button>
  );
};

export const IncreaseButton = ({ id }: { id: string }) => {
  const increase = useProductContext((state) => state.addProduct);
  const handleIncrease = useCallback(() => {
    increase(id);
  }, [increase, id]);

  return (
    <Button onClick={handleIncrease} size={"icon"}>
      <Plus />
    </Button>
  );
};

export const Count = ({ id }: { id: string }) => {
  const count = useProductContext((state) => state.products[id]);
  return <div className="min-w-8 text-center">{count}</div>;
};
