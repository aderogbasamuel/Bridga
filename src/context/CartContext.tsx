// context/CartContext.tsx
import { createContext, useContext, useState } from "react";
import type { CartItem } from "../types/order";

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.productId === productId);
      if (existing) {
        return prev.map((c) =>
          c.productId === productId ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  return <CartContext.Provider value={{ cart, addToCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
