"use client";

// Provider wrapper
import {
  createProductsStore,
  ProductContext,
  ProductStore,
} from "@/context/store";
import { SelectProduct } from "@/db/schema";
import { useRef } from "react";

type ProductsProviderProps = React.PropsWithChildren<{
  products: SelectProduct[];
}>;

export function ProductsProvider({
  children,
  products,
}: ProductsProviderProps) {
  const storeRef = useRef<ProductStore>(null);
  if (!storeRef.current) {
    storeRef.current = createProductsStore(products);
  }
  return (
    <ProductContext.Provider value={storeRef.current}>
      {children}
    </ProductContext.Provider>
  );
}
