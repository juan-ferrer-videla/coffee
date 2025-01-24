import { editUser, getUser, getUserOrders } from "@/_actions/actions";
import { Suspense } from "react";
import { Submit } from "@/components/submit";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import { TLocale } from "@/i18n";
import { getDictionary } from "@/get-dictionary";
import { OrdersClient } from "./orders-client";

const Orders = async ({ id }: { id: number }) => {
  const allOrders = await getUserOrders(id);

  const data = allOrders.map((order) => ({
    id: order.id,
    userId: order.userId,
    productId: order.productId,
    quantity: order.quantity,
    delivery: order.delivery,
    status: order.status,
    purchasedAt: order.purchasedAt,
    title: order.product.title,
    price: order.product.price,
  }));

  // Pasar los datos al componente cliente
  return <OrdersClient data={data} />;
};

export default async function Profile({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;
  const user = await getUser();
  if (!user) {
    redirect(`/${lang}/sign-in`);
  }

  const {profile_details, name, ID, phone, province, town, zip_code, number, indications, street, save_changes, purchased_items } = await getDictionary(lang)

  return (
    <>
      <h2 className="mb-6 scroll-m-20 text-center text-4xl font-extrabold tracking-tight sm:mb-10 md:mb-16 lg:text-5xl">
        {profile_details}
      </h2>

      <form
        action={editUser}
        className="mb-6 grid gap-6 sm:mb-10 sm:grid-cols-2 sm:gap-x-10 md:mb-16 md:gap-x-14 lg:mb-24"
      >
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">{name}</Label>
          <Input
            id="name"
            name="name"
            placeholder="Cafe..."
            defaultValue={user.name}
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="dni">{ID}</Label>
          <Input
            id="dni"
            name="dni"
            placeholder="40000000"
            defaultValue={user.dni ?? ""}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="phone">{phone}</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="123456789"
            defaultValue={user.phone ?? ""}
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" defaultValue={user.email} disabled />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="state">{province}</Label>
          <Input
            id="state"
            name="state"
            placeholder="Ciudad de ..."
            defaultValue={user.state ?? ""}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="city">{town}</Label>
          <Input
            id="city"
            name="city"
            placeholder="Ciudad de ..."
            defaultValue={user.city ?? ""}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="postalCode">{zip_code}</Label>
          <Input
            id="postalCode"
            name="postalCode"
            placeholder="5500"
            defaultValue={user.postalCode ?? ""}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="street">{street}</Label>
          <Input
            id="street"
            name="street"
            placeholder="9 de Julio..."
            defaultValue={user.street ?? ""}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="streetNumber">{number}</Label>
          <Input
            id="streetNumber"
            name="streetNumber"
            type="number"
            placeholder="0000"
            defaultValue={user.streetNumber ?? ""}
          />
        </div>
        <div className="grid w-full items-center gap-1.5 sm:col-span-2">
          <Label htmlFor="indications">{indications}</Label>
          <Textarea
            id="indications"
            name="indications"
            placeholder="Describi como te podemos ubicar..."
            defaultValue={user.indications ?? ""}
          />
        </div>
        <input type="hidden" name="id" value={user.id} />

        <div className="flex sm:col-span-2">
          <Submit text={save_changes} />
        </div>
      </form>

      <div>
        <h2 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
          {purchased_items}
        </h2>
        <Suspense fallback={"Cargando datos..."}>
          <Orders id={user.id} />
        </Suspense>
      </div>
    </>
  );
}
