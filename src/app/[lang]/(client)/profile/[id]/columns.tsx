"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useDictionary } from "@/hooks/useDictionary";
import Link from "next/link";

export interface PurchaseInfo {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  delivery: boolean;
  status: "pending" | "dispatched" | "delivered";
  purchasedAt: string;
  title: string;
  price: number;
}

export const useColumns = (): ColumnDef<PurchaseInfo>[] => {
  const { status, product, purchased_at, quantity, lang } = useDictionary();

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
        <div className="lowercase">
          <Link href={`/${lang}/products/${row.original.productId}`}>
            {row.getValue("title")}
          </Link>
        </div>
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
  ];
};
