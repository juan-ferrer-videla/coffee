"use client";

import { langContext } from "@/context/lang";
import { useContext } from "react";

export const useDictionary = () => {
  const dictionary = useContext(langContext);
  if (!dictionary)
    throw new Error("You are calling useDictionary outside LangProvider");

  return dictionary;
};
