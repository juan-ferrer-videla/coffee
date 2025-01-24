"use client";

import React from "react";
import { getUsersToPresentialCourses } from "@/_actions/actions";
import { useQuery } from "@tanstack/react-query";
import { DataTableInscriptions } from "./table";

export const InscriptionTable = () => {
  const {
    data: inscriptions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users-to-presential-courses"],
    queryFn: getUsersToPresentialCourses,
    refetchInterval: 15000,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <DataTableInscriptions
      data={
        inscriptions?.map(
          ({
            presentialCourses: { title, initialDate },
            user: { email, name },
            id,
            purchasedAt,
          }) => ({
            id,
            title,
            initialDate,
            email,
            purchasedAt,
            name,
          }),
        ) ?? []
      }
    />
  );
};
