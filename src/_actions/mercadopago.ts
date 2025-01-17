"use server";

import { Preference } from "mercadopago";
import type { Items } from "mercadopago/dist/clients/commonTypes";
import { redirect } from "next/navigation";
import { client } from "@/mercadopago";
import { getProducts } from "./actions";

const preference = new Preference(client);

export const createPreference = async (
  store: [string, number][],
  email: string,
  delivery: boolean,
) => {
  const products = await getProducts();
  const items = store.reduce<Items[]>((acc, [id, quantity]) => {
    const product = products.find((product) => product.id === parseInt(id));
    if (product && quantity > 0) {
      acc.push({
        id,
        quantity,
        title: product.title,
        unit_price: product.price,
      });
    }
    return acc;
  }, []);

  const preferenceResponse = await preference.create({
    body: {
      items,
      metadata: { email, delivery },
    },
  });
  const initPoint = preferenceResponse.init_point;

  if (initPoint) {
    redirect(initPoint);
  }
};
