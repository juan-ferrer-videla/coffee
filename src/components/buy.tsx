"use client";

import { useProductContext } from "@/hooks/useProduct";
import { Button, ButtonProps } from "./ui/button";
import { useDictionary } from "@/hooks/useDictionary";
import { createPreference } from "@/_actions/mercadopago";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState, type FC } from "react";
import { editUser } from "@/_actions/actions";
import { SelectUser } from "@/db/schema";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Pin, Truck } from "lucide-react";

export const Buy: FC<ButtonProps & { close: () => void; user: SelectUser }> = ({
  close,
  user,
  ...props
}) => {
  const { buy: title, warehouse, phone, street, zip_code, indications, province, town, number } = useDictionary();
  const productsMap = useProductContext((state) => state.products);
  const products = Object.entries(productsMap);
  const [delivery, setDelivery] = useState(false);

  return (
    <form
      action={async (formData: FormData) => {
        if (!user?.email) return;
        await Promise.allSettled([
          createPreference(products, user.email, delivery),
          editUser(formData),
        ]);
        close();
      }}
    >
      <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
        <RadioGroup
          defaultValue="deposit"
          className="mb-3 grid grid-cols-3 gap-4"
          name="delivery"
          onValueChange={(value) => {
            setDelivery(value === "delivery");
          }}
        >
          <div>
            <RadioGroupItem
              value="delivery"
              id="delivery"
              className="peer sr-only"
            />
            <Label
              htmlFor="delivery"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Truck className="mb-3 h-6 w-6" />
              Delivery
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="deposit"
              id="deposit"
              className="peer sr-only"
            />
            <Label
              htmlFor="deposit"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Pin className="mb-3 h-6 w-6" />
              {warehouse}
            </Label>
          </div>
        </RadioGroup>
        <Label htmlFor="phone">{phone}</Label>
        <Input
          id="phone"
          placeholder="2615332606"
          name="phone"
          required
          defaultValue={user.phone ?? ""}
        />
      </div>
      {delivery && (
        <>
          <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="postalCode">{zip_code}</Label>
            <Input
              type="number"
              id="postalCode"
              placeholder="5572"
              name="postalCode"
              required
              defaultValue={user.postalCode ?? ""}
            />
          </div>
          <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="street">{street}</Label>
            <Input
              id="street"
              placeholder="San Martin"
              name="street"
              required
              defaultValue={user.street ?? ""}
            />
          </div>
          <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="streetNumber">{number}</Label>
            <Input
              id="streetNumber"
              placeholder="2608"
              name="streetNumber"
              required
              defaultValue={user.streetNumber ?? ""}
            />
          </div>
          <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="state">{province}</Label>
            <Input
              id="state"
              placeholder="Mendoza"
              name="state"
              required
              defaultValue={user.state ?? ""}
            />
          </div>
          <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="city">{town}</Label>
            <Input
              id="city"
              placeholder="Ciudad de Mendoza"
              name="city"
              required
              defaultValue={user.city ?? ""}
            />
          </div>
          <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="indications">{indications}</Label>
            <Textarea
              id="indications"
              name="indications"
              defaultValue={user.indications ?? ""}
              rows={4}
            />
          </div>
        </>
      )}
      <input
        type="hidden"
        name="rawProducts"
        value={JSON.stringify(products)}
        required
      />
      <input type="hidden" name="id" value={user?.id} required />
      <Button {...props}>{title}</Button>
    </form>
  );
};
