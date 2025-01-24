"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useDictionary } from "@/hooks/useDictionary";

export interface PurchaseInfo {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  delivery: boolean;
  status: "pending" | "dispatched" | "delivered";
  purchasedAt: string;
  title: string;
  price: number;
}

export const useColumns = (): ColumnDef<PurchaseInfo>[] => {

  const {status, product, purchased_at, quantity, price} = useDictionary()
  
  return [
    {
      accessorKey: "status",
      header: status,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "title",
      header: product,
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "purchasedAt",
      header: purchased_at,
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("purchasedAt")}</div>
      ),
    },
    {
      accessorKey: "quantity",
      header: quantity,
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("quantity")}</div>
      ),
    },
    {
      accessorKey: price,
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency: "ARS",
        }).format(price);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
  ];
};
