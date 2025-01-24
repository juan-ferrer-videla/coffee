"use client";

import { DataTable } from "./data-table";
import { useColumns } from "./columns";
import { PurchaseInfo } from "./columns";

interface OrdersClientProps {
  data: PurchaseInfo[];
}

export const OrdersClient = ({ data }: OrdersClientProps) => {
  const columns = useColumns();

  return <DataTable data={data} columns={columns} />;
};
