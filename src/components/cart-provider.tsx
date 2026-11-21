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
  subtotal: number;
  couponCode: string;
  setCouponCode: (code: string) => void;
  addItem: (product: Product, options: Record<string, string>, quantity?: number) => void;
  updateQuantity: (productId: number, options: Record<string, string>, quantity: number) => void;
  removeItem: (productId: number, options: Record<string, string>) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "marketly-cart-v1";
const COUPON_KEY = "marketly-coupon-v1";

const sameLine = (item: CartLine, productId: number, options: Record<string, string>) =>
  item.productId === productId && JSON.stringify(item.options) === JSON.stringify(options);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [couponCode, setCouponCodeState] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored) as CartLine[]);
      setCouponCodeState(window.localStorage.getItem(COUPON_KEY) ?? "");
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(COUPON_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      if (couponCode) window.localStorage.setItem(COUPON_KEY, couponCode);
      else window.localStorage.removeItem(COUPON_KEY);
    }
  }, [items, couponCode, hydrated]);

  const setCouponCode = useCallback((code: string) => setCouponCodeState(code), []);

  const addItem = useCallback((product: Product, options: Record<string, string>, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => sameLine(item, product.id, options));
      if (existing) return current.map((item) => sameLine(item, product.id, options) ? { ...item, quantity: item.quantity + quantity } : item);
      return [...current, { productId: product.id, name: product.name, vendor: product.vendor, price: product.price, image: product.image, quantity, options }];
    });
  }, []);

  const updateQuantity = useCallback((productId: number, options: Record<string, string>, quantity: number) => {
    setItems((current) => quantity <= 0
      ? current.filter((item) => !sameLine(item, productId, options))
      : current.map((item) => sameLine(item, productId, options) ? { ...item, quantity: Math.min(quantity, 99) } : item));
  }, []);

  const removeItem = useCallback((productId: number, options: Record<string, string>) => {
    setItems((current) => current.filter((item) => !sameLine(item, productId, options)));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCouponCodeState("");
  }, []);

  const value = useMemo(() => ({
    items,
    cartCount: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
    couponCode,
    setCouponCode,
    addItem,
    updateQuantity,
    removeItem,
    clearCart
  }), [items, couponCode, setCouponCode, addItem, updateQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
