"use client";

import { TDictionary } from "@/get-dictionary";
import React from "react";
import { langContext } from "@/context/lang";

export const LangProvider = ({
  dictionary,
  children,
}: {
  dictionary: TDictionary;
  children: React.ReactNode;
}) => {
  return (
    <langContext.Provider value={dictionary}>{children}</langContext.Provider>
  );
};
