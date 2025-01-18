"use client";

import React from "react";
import { DataTableDemo } from "../products/table";
import { getOrders } from "@/_actions/actions";
import { useQuery } from "@tanstack/react-query";

export const DataTable = () => {
  const {
    data: payments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    refetchInterval: 15000,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <DataTableDemo
      data={
        payments?.map(
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
        ) ?? []
      }
    />
  );
};
