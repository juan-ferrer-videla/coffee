"use client";

import { useProductContext } from "@/hooks/useProduct";
import { Button, ButtonProps } from "./ui/button";
import { useDictionary } from "@/hooks/useDictionary";
import { createPreference } from "@/_actions/mercadopago";
import { useSession } from "next-auth/react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { type FC } from "react";

export const Buy: FC<ButtonProps & { close: () => void }> = ({
  close,
  ...props
}) => {
  const { buy: title } = useDictionary();
  const productsMap = useProductContext((state) => state.products);
  const products = Object.entries(productsMap);
  const { data: session } = useSession();
  const email = session?.user?.email;

  return (
    <form
      action={async (formData: FormData) => {
        const email = formData.get("email");
        if (typeof email !== "string") return;
        await createPreference(products, email);
        close();
      }}
    >
      {typeof email === "string" ? (
        <input type="hidden" name="email" value={email} />
      ) : (
        <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="juan.ferrer@gmail.com"
            name="email"
            required
          />
        </div>
      )}
      <input
        type="hidden"
        name="rawProducts"
        value={JSON.stringify(products)}
        required
      />
      <Button {...props}>{title}</Button>
    </form>
  );
};
