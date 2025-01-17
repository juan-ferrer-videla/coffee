"use client";

import { useProductContext } from "@/hooks/useProduct";
import { Button, ButtonProps } from "./ui/button";
import { useDictionary } from "@/hooks/useDictionary";
import { createPreference } from "@/_actions/mercadopago";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { type FC } from "react";
import { editUser } from "@/_actions/actions";
import { SelectUser } from "@/db/schema";
import { Textarea } from "./ui/textarea";

export const Buy: FC<ButtonProps & { close: () => void; user: SelectUser }> = ({
  close,
  user,
  ...props
}) => {
  const { buy: title } = useDictionary();
  const productsMap = useProductContext((state) => state.products);
  const products = Object.entries(productsMap);

  return (
    <form
      action={async (formData: FormData) => {
        if (!user?.email) return;
        await Promise.allSettled([
          createPreference(products, user.email),
          editUser(formData),
        ]);
        close();
      }}
    >
      <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="phone">Telefono</Label>
        <Input
          id="phone"
          placeholder="2615332606"
          name="phone"
          required
          defaultValue={user.phone ?? ""}
        />
      </div>
      <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="postalCode">Código Postal</Label>
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
        <Label htmlFor="street">Calle</Label>
        <Input
          id="street"
          placeholder="San Martin"
          name="street"
          required
          defaultValue={user.street ?? ""}
        />
      </div>
      <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="streetNumber">Numeración</Label>
        <Input
          id="streetNumber"
          placeholder="2608"
          name="streetNumber"
          required
          defaultValue={user.streetNumber ?? ""}
        />
      </div>
      <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="state">Provincia</Label>
        <Input
          id="state"
          placeholder="Mendoza"
          name="state"
          required
          defaultValue={user.state ?? ""}
        />
      </div>
      <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="city">Localidad</Label>
        <Input
          id="city"
          placeholder="Ciudad de Mendoza"
          name="city"
          required
          defaultValue={user.city ?? ""}
        />
      </div>
      <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="indications">Indicaciones</Label>
        <Textarea
          id="indications"
          name="indications"
          defaultValue={user.indications ?? ""}
          rows={4}
        />
      </div>

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
