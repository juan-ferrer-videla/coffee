"use server";

import { Preference } from "mercadopago";
import type { Items } from "mercadopago/dist/clients/commonTypes";
import { redirect } from "next/navigation";
import { getProducts } from "./products";
import { client } from "@/mercadopago";

const preference = new Preference(client);

export const createPreference = async (
  store: { id: number; count: number }[],
  table: string,
) => {
  const products = await getProducts();
  const items = store.reduce<Items[]>((acc, { id, count }) => {
    const product = products.find((product) => product.id === id);
    if (product) {
      acc.push({
        id: id.toString(),
        quantity: count,
        title: product.title,
        unit_price: product.price,
        description: table,
      });
    }
    return acc;
  }, []);
  const preferenceResponse = await preference.create({
    body: {
      items,
    },
  });

  const initPoint = preferenceResponse.init_point;

  if (initPoint) {
    redirect(initPoint);
  }
};
