import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ICart {
  _id?: string;
  productId: string;
  quantity: number;
  variantId: string;
  name: string;
  price: number;
  image?: string;
  attributes: Record<string, string>;
  totalQuantity: number;
}

export interface ICartStore {
  carts: ICart[];
  addToCart: (data: ICart) => void;
  removeFromCart: (data: ICart) => void;
}

const useBaseCartStore = create<ICartStore>()(
  persist(
    (set) => ({
      carts: [] as ICart[],
      addToCart: (data: ICart) =>
        set((state) => {
          const existingCart = state.carts.find((item) => item.productId === data.productId && item.variantId === data.variantId);
          if (existingCart) {
            existingCart.quantity += data.quantity;
          } else {
            state.carts.push(data);
          }
          return { carts: state.carts };
        }),
      removeFromCart: (data: ICart) =>
        set((state) => {
          return { carts: state.carts.filter((item) => item.productId !== data.productId && item.variantId !== data.variantId) };
        }),
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useCartStore = createSelectorFunctions(useBaseCartStore);
