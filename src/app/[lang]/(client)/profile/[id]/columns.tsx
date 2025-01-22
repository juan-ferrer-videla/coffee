"use client";

import * as React from "react";
import {
  ColumnDef,
} from "@tanstack/react-table";


export interface PurchaseInfo {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  delivery: boolean;
  status: "pending" | "dispatched" | "delivered";
  purchasedAt: string;
  product: {
    id: number;
    title: string;
    img: string;
    description: string | null;
    price: number;
    isRecommended: boolean;
  };
  user: {
    id: number;
    name: string;
    email: string;
  };
}


export const columns: ColumnDef<PurchaseInfo>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "product.title",
    header: "Product",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "purchasedAt",
    header: "Purchased At",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("purchasedAt")}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
