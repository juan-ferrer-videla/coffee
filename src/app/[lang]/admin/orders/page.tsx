import React from "react";
import { DataTableDemo, type Payment } from "../products/table";
import { getOrders } from "@/_actions/actions";

export default async function Dashboard() {
  const orders = await getOrders();
  const payments = orders.map(
    ({
      product: { title },
      user: {
        email,
        city,
        indications,
        postalCode,
        state,
        street,
        streetNumber,
      },
      delivery,
      quantity,
      status,
      id,
      purchasedAt,
    }) => ({
      id,
      title,
      quantity,
      email,
      status,
      purchasedAt,
      city,
      indications,
      postalCode,
      state,
      street,
      streetNumber,
      delivery,
    }),
  ) satisfies Payment[];

  return <DataTableDemo data={payments} />;
}
