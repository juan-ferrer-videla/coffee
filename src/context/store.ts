import { create } from "zustand";

export interface TProduct {
  title: string;
  price: number;
  id: number;
}

export const products: TProduct[] = [
  { title: "pipa", price: 500, id: 1 },
  { title: "cogollo", price: 4000, id: 2 },
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
  getTotal: () => number; // Derived state
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
}));
