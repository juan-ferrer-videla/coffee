import React from "react";
import { Payment } from "../products/table";
import { getOrders } from "@/_actions/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { DataTable } from "./data-table";

const fetchOrders = async () => {
  const response = await getOrders(); // Fetch data from your server or API
  return response.map(
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
  );
};

export const useOrders = (initialData: Payment[]) =>
  useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    refetchInterval: 30000,
    initialData,
  });

export default async function Dashboard() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DataTable />
    </HydrationBoundary>
  );
}
