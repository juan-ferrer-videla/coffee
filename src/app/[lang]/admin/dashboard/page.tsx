import React from "react";
import { DataTableDemo, type Payment } from "../table";
import { getOrders } from "@/actions";

export default async function Dashboard() {
  const orders = await getOrders();
  const payments = orders.map(
    ({
      product: { title },
      user: { email },
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
    }),
  ) satisfies Payment[];

  return <DataTableDemo data={payments} />;
}
