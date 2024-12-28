"use client";

import { ProductContext, ProductState } from "@/context/store";
import { useContext } from "react";
import { useStore } from "zustand";

export function useProductContext<T>(selector: (state: ProductState) => T): T {
  const store = useContext(ProductContext);
  if (!store) throw new Error("Missing ProductContext.Provider in the tree");
  return useStore(store, selector);
}
