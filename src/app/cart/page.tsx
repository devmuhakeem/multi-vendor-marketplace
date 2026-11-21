"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Minus, Plus, ShoppingBag, Tag, Trash2, Truck } from "lucide-react";
import { formatNaira } from "@/data/products";
import { useCart } from "@/components/cart-provider";

const DEMO_COUPONS: Record<string, { label: string; type: "percent" | "fixed"; amount: number }> = {
  WELCOME10: { label: "10% off your items", type: "percent", amount: 10 },
  MARKET500: { label: "₦500 off your items", type: "fixed", amount: 500 }
};

export default function CartPage() {
  const { items, cartCount, updateQuantity, removeItem, couponCode, setCouponCode } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const groups = useMemo(() => {
    const map = new Map<string, typeof items>();
    items.forEach((item) => map.set(item.vendor, [...(map.get(item.vendor) ?? []), item]));
    return Array.from(map.entries());
  }, [items]);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = couponCode && DEMO_COUPONS[couponCode]
    ? Math.min(subtotal, DEMO_COUPONS[couponCode].type === "percent" ? subtotal * DEMO_COUPONS[couponCode].amount / 100 : DEMO_COUPONS[couponCode].amount)
    : 0;
  const deliveryEstimate = groups.length * 1500;
  const total = subtotal - discount + deliveryEstimate;

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code || !DEMO_COUPONS[code]) {
      setCouponCode("");
      setCouponMessage("That demo code is not recognised. Try WELCOME10 or MARKET500.");
      return;
    }
    setCouponCode(code);
    setCouponMessage(`${code} applied — ${DEMO_COUPONS[code].label}.`);
  }

  return (
    <main className="min-h-screen pb-16">
      <header className="border-b border-[#e8ebe5] bg-white">
        <div className="container-shell flex h-20 items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tight text-[#17211b]">marketly<span className="text-[#91b52b]">.</span></Link>
          <Link href="/" className="text-sm font-semibold text-[#536057] hover:text-[#17211b]">Continue shopping <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
        </div>
      </header>
      <div className="container-shell pt-10">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#657168] hover:text-[#17211b]"><ArrowLeft className="h-4 w-4" /> Back to marketplace</Link>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-sm font-bold uppercase tracking-[.16em] text-[#8ca52e]">Your bag</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Shopping cart <span className="text-[#879187]">({cartCount})</span></h1></div>
          <p className="text-sm text-[#657168]">Your selections are saved in this browser.</p>
        </div>
        {items.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-[#cfd6cc] bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f1f5e8] text-[#779b21]"><ShoppingBag className="h-7 w-7" /></div>
            <h2 className="mt-5 text-2xl font-extrabold">Your cart is taking a break</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#69756c]">Explore the marketplace and add something you love. Your items will appear here.</p>
            <Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#17211b] px-6 py-3 text-sm font-bold text-white hover:bg-[#304238]">Explore products <ArrowRight className="h-4 w-4" /></Link>
          </section>
        ) : (
          <div className="grid items-start gap-7 lg:grid-cols-[1fr_360px]">
            <section className="space-y-5">
              {groups.map(([vendor, vendorItems]) => (
                <div key={vendor} className="overflow-hidden rounded-2xl border border-[#e6eae3] bg-white">
                  <div className="flex items-center justify-between border-b border-[#edf0eb] px-5 py-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-[#8a968d]">Sold by</p><h2 className="mt-1 font-extrabold">{vendor}</h2></div><span className="rounded-full bg-[#f2f5ed] px-3 py-1 text-xs font-bold text-[#637a32]">{vendorItems.length} {vendorItems.length === 1 ? "item" : "items"}</span></div>
                  <div className="divide-y divide-[#edf0eb]">
                    {vendorItems.map((item) => (
                      <article key={item.productId + JSON.stringify(item.options)} className="flex gap-4 p-4 sm:p-5">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f4f5f1] sm:h-28 sm:w-28"><Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover" unoptimized /></div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-2"><div><Link href={`/products/${item.productId}`} className="font-bold leading-5 hover:underline">{item.name}</Link><p className="mt-1 text-xs text-[#758078]">{Object.entries(item.options).map(([key, value]) => `${key}: ${value}`).join(" · ") || "Standard option"}</p></div><p className="font-extrabold">{formatNaira(item.price * item.quantity)}</p></div>
                          <div className="mt-4 flex items-center justify-between gap-3">
                            <div className="inline-flex items-center rounded-full border border-[#e2e7df]"><button aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.productId, item.options, item.quantity - 1)} className="p-2.5 hover:text-[#779b21]"><Minus className="h-3.5 w-3.5" /></button><span className="min-w-7 text-center text-sm font-bold tabular-nums">{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.productId, item.options, item.quantity + 1)} className="p-2.5 hover:text-[#779b21]"><Plus className="h-3.5 w-3.5" /></button></div>
                            <button onClick={() => removeItem(item.productId, item.options)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9b5b54] hover:text-red-700"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className="flex justify-between bg-[#fafbf8] px-5 py-3 text-sm"><span className="text-[#758078]">Store subtotal</span><strong>{formatNaira(vendorItems.reduce((sum, item) => sum + item.price * item.quantity, 0))}</strong></div>
                </div>
              ))}
              <div className="rounded-2xl border border-[#e6eae3] bg-white p-5">
                <div className="flex items-center gap-2 font-bold"><Tag className="h-4 w-4 text-[#839e2e]" /> Have a promo code?</div>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row"><input value={couponInput} onChange={(event) => setCouponInput(event.target.value)} placeholder="Enter code" className="min-w-0 flex-1 rounded-xl border border-[#dfe5dc] px-4 py-3 text-sm outline-none focus:border-[#91ad3c]" /><button onClick={applyCoupon} className="rounded-xl bg-[#17211b] px-5 py-3 text-sm font-bold text-white hover:bg-[#304238]">Apply code</button></div>
                {couponMessage && <p className={`mt-3 flex items-center gap-2 text-xs font-semibold ${couponCode ? "text-[#66852a]" : "text-[#a15d50]"}`}>{couponCode && <Check className="h-4 w-4" />}{couponMessage}</p>}
                <p className="mt-2 text-xs text-[#8a968d]">Demo codes: WELCOME10 and MARKET500. Coupon checks are frontend-only.</p>
              </div>
            </section>
            <aside className="rounded-2xl border border-[#e6eae3] bg-white p-5 sm:p-6 lg:sticky lg:top-6">
              <h2 className="text-xl font-extrabold">Order summary</h2>
              <div className="mt-5 space-y-3 text-sm"><div className="flex justify-between text-[#68746b]"><span>Items ({cartCount})</span><span>{formatNaira(subtotal)}</span></div><div className="flex justify-between text-[#68746b]"><span>Promo discount</span><span className="font-semibold text-[#66852a]">−{formatNaira(discount)}</span></div><div className="flex justify-between text-[#68746b]"><span>Estimated delivery</span><span>{formatNaira(deliveryEstimate)}</span></div><p className="text-xs leading-5 text-[#8a968d]">Delivery estimate is calculated per store and confirmed during fulfilment.</p></div>
              <div className="my-5 border-t border-dashed border-[#dce2d9]" /><div className="flex items-center justify-between text-lg font-black"><span>Total</span><span>{formatNaira(total)}</span></div>
              <Link href="/checkout" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#91b52b] px-5 py-4 text-sm font-extrabold text-[#17211b] transition hover:bg-[#a5c94a]">Continue to checkout <ArrowRight className="h-4 w-4" /></Link>
              <div className="mt-5 flex items-start gap-3 rounded-xl bg-[#f5f7f1] p-3"><Truck className="mt-0.5 h-4 w-4 shrink-0 text-[#829c34]" /><p className="text-xs leading-5 text-[#68746b]">Orders from different stores may arrive separately. Each store handles its own fulfilment.</p></div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
