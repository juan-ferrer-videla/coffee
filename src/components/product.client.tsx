"use client";

import { Plus, Minus } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { FC, useCallback } from "react";
import { useProductContext } from "@/hooks/useProduct";
import { cn } from "@/lib/utils";

export const DecreaseButton: FC<ButtonProps & { id: string }> = ({
  id,
  className,
  ...props
}) => {
  const count = useProductContext((state) => state.products[id]);
  const decrease = useProductContext((state) => state.removeProduct);

  const handleDecrease = useCallback(() => {
    decrease(id);
  }, [decrease, id]);

  return (
    <Button
      disabled={count < 1}
      onClick={handleDecrease}
      size={"icon"}
      className={className}
      {...props}
    >
      <Minus />
    </Button>
  );
};

export const IncreaseButton: FC<ButtonProps & { id: string }> = ({
  id,
  className,
  ...props
}) => {
  const increase = useProductContext((state) => state.addProduct);
  const handleIncrease = useCallback(() => {
    increase(id);
  }, [increase, id]);

  return (
    <Button
      onClick={handleIncrease}
      size={"icon"}
      className={className}
      {...props}
    >
      <Plus />
    </Button>
  );
};

export const Count = ({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) => {
  const count = useProductContext((state) => state.products[id]);
  return <div className={cn("min-w-8 text-center", className)}>{count}</div>;
};
