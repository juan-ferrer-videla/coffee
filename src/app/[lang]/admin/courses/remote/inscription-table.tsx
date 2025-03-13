"use client";

import React from "react";
import { getUsersToRemoteCourses } from "@/_actions/actions";
import { useQuery } from "@tanstack/react-query";
import { DataTableInscriptions } from "./table";

export const InscriptionTable = () => {
  const {
    data: inscriptions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users-to-remote-courses"],
    queryFn: getUsersToRemoteCourses,
    refetchInterval: 15000,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <DataTableInscriptions
      data={
        inscriptions?.map(
          ({
            remoteCourses: { title },
            user: { email, name, phone },
            id,
            purchasedAt,
          }) => ({
            id,
            title,
            email,
            purchasedAt,
            name,
            phone: phone ?? "unknown",
          }),
        ) ?? []
      }
    />
  );
};
