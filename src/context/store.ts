import { createStore } from "zustand";

import { StaticImageData } from "next/image";

export interface TProduct {
  img: string | null | StaticImageData;
  title: string;
  description: string | null;
  price: number;
  id: number;
}

import { createContext } from "react";
import { SelectProduct } from "@/db/schema";

export const ProductContext = createContext<ProductStore | null>(null);

export interface ProductProps {
  products: Record<string, number>;
}

export interface ProductState extends ProductProps {
  addProduct: (id: string) => void;
  removeProduct: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getLength: () => number;
}

export type ProductStore = ReturnType<typeof createProductsStore>;

export const createProductsStore = (initProps: SelectProduct[]) => {
  const initialCart: Record<string, number> = initProps.reduce<
    Record<string, number>
  >((acc, { id }) => {
    acc[id] = 0;
    return acc;
  }, {});

  return createStore<ProductState>()((set, get) => ({
    products: initialCart,
    addProduct: (id: string) =>
      set((state) => ({
        products: { ...state.products, [id]: state.products[id] + 1 },
      })),
    removeProduct: (id: string) =>
      set((state) => ({
        products: {
          ...state.products,
          [id]: Math.max(state.products[id] - 1, 0),
        },
      })),
    clearCart: () => set(() => ({ products: { ...initialCart } })),
    getTotal() {
      const cart = get().products;
      return initProps.reduce(
        (acc, { id, price }) => acc + price * (cart[id] || 0),
        0,
      );
    },
    getLength: () => {
      const cart = get().products;
      return Object.values(cart).reduce((acc, count) => acc + count, 0);
    },
  }));
};
