"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";

export type CartLine = {
  productId: number;
  name: string;
  vendor: string;
  price: number;
  image: string;
  quantity: number;
  options: Record<string, string>;
};

type CartContextValue = {
  items: CartLine[];
  cartCount: number;
  addItem: (product: Product, options: Record<string, string>, quantity?: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "marketly-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored) as CartLine[]);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, options: Record<string, string>, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) =>
        item.productId === product.id && JSON.stringify(item.options) === JSON.stringify(options)
      );
      if (existing) {
        return current.map((item) => item === existing ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...current, {
        productId: product.id,
        name: product.name,
        vendor: product.vendor,
        price: product.price,
        image: product.image,
        quantity,
        options
      }];
    });
  }, []);

  const value = useMemo(() => ({
    items,
    cartCount: items.reduce((total, item) => total + item.quantity, 0),
    addItem
  }), [items, addItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
