import { StaticImageData } from "next/image";
import { create } from "zustand";
import img from "@/assets/cogollo.webp";
import pipa from "@/assets/pipa.jpg";

export interface TProduct {
  src: StaticImageData;
  title: string;
  description: string;
  price: number;
  id: number;
}

export const products: TProduct[] = [
  {
    title: "Pipa",
    price: 500,
    id: 1,
    src: img,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt modi voluptas nulla",
  },
  {
    title: "Cogollo",
    price: 4000,
    id: 2,
    src: img,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt modi voluptas nulla",
  },
  {
    title: "Pica",
    price: 3200,
    id: 3,
    src: pipa,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt modi voluptas nulla",
  },
  {
    title: "Planta",
    price: 2500,
    id: 4,
    src: img,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt modi voluptas nulla",
  },
];

const initialCart: Record<string, number> = products.reduce<
  Record<string, number>
>((acc, { id }) => {
  acc[id] = 0;
  return acc;
}, {});

interface CartStore {
  products: Record<string, number>;
  addProduct: (id: string) => void;
  removeProduct: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getLength: () => number;
}

export const useStore = create<CartStore>((set, get) => ({
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
  clearCart: () => set(() => ({ products: initialCart })),
  getTotal() {
    const cart = get().products;
    return products.reduce(
      (acc, { id, price }) => acc + price * (cart[id] || 0),
      0,
    );
  },
  getLength: () => {
    const cart = get().products;
    return Object.values(cart).reduce((acc, count) => acc + count, 0);
  },
}));
