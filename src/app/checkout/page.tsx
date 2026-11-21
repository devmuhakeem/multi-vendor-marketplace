"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, LockKeyhole, MapPin, PackageCheck } from "lucide-react";
import { formatNaira } from "@/data/products";
import { useCart } from "@/components/cart-provider";

export default function CheckoutPage() {
  const { items, cartCount, subtotal, couponCode, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", address: "", city: "", state: "", deliveryNote: "" });
  const [error, setError] = useState("");

  const delivery = new Set(items.map((item) => item.vendor)).size * 1500;
  const couponDiscount = couponCode === "WELCOME10" ? subtotal * 0.1 : couponCode === "MARKET500" ? Math.min(subtotal, 500) : 0;
  const total = subtotal - couponDiscount + delivery;
  const vendors = Array.from(new Set(items.map((item) => item.vendor)));

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function placeDemoOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length) return;
    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim() || !form.state.trim()) {
      setError("Please complete all required delivery and contact fields.");
      return;
    }
    setError("");
    setSubmitted(true);
    clearCart();
  }

  if (submitted) {
    return <main className="min-h-screen bg-[#f7f8f4] px-5 py-16"><section className="mx-auto max-w-xl rounded-3xl border border-[#e4e9df] bg-white p-8 text-center sm:p-12"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef5df] text-[#789a2b]"><CheckCircle2 className="h-8 w-8" /></div><p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-[#829c34]">Checkout preview</p><h1 className="mt-2 text-3xl font-black">Details received</h1><p className="mt-3 text-sm leading-6 text-[#69756c]">This is a frontend demonstration. No order was sent to a server and no payment was collected. Your cart has been cleared in this browser.</p><div className="mt-7 rounded-2xl bg-[#f7f8f4] p-4 text-left text-sm"><p className="font-bold">{form.fullName}</p><p className="mt-1 text-[#69756c]">{form.address}, {form.city}, {form.state}</p><p className="mt-1 text-[#69756c]">{form.phone} · {form.email}</p></div><Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#17211b] px-6 py-3 text-sm font-bold text-white">Back to marketplace <ArrowRight className="h-4 w-4" /></Link></section></main>;
  }

  return (
    <main className="min-h-screen pb-16">
      <header className="border-b border-[#e8ebe5] bg-white"><div className="container-shell flex h-20 items-center justify-between"><Link href="/" className="text-2xl font-black tracking-tight">marketly<span className="text-[#91b52b]">.</span></Link><span className="inline-flex items-center gap-2 text-xs font-semibold text-[#758078]"><LockKeyhole className="h-4 w-4" /> Secure checkout preview</span></div></header>
      <div className="container-shell pt-10">
        <Link href="/cart" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#657168] hover:text-[#17211b]"><ArrowLeft className="h-4 w-4" /> Back to cart</Link>
        <div className="mb-8"><p className="text-sm font-bold uppercase tracking-[.16em] text-[#8ca52e]">Almost there</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Checkout</h1><p className="mt-2 text-sm text-[#69756c]">Add your delivery details to review the checkout experience.</p></div>
        {items.length === 0 ? <section className="rounded-2xl border border-[#e6eae3] bg-white p-8 text-center"><PackageCheck className="mx-auto h-9 w-9 text-[#829c34]" /><h2 className="mt-4 text-xl font-extrabold">Your cart is empty</h2><p className="mt-2 text-sm text-[#69756c]">Add products before continuing to checkout.</p><Link href="/" className="mt-5 inline-flex rounded-full bg-[#17211b] px-5 py-3 text-sm font-bold text-white">Browse products</Link></section> : (
          <form onSubmit={placeDemoOrder} className="grid items-start gap-7 lg:grid-cols-[1fr_360px]">
            <section className="space-y-5">
              <div className="rounded-2xl border border-[#e6eae3] bg-white p-5 sm:p-7">
                <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f5e8] text-[#829c34]"><MapPin className="h-5 w-5" /></div><div><h2 className="text-lg font-extrabold">Delivery information</h2><p className="text-xs text-[#829087]">Where should your order be delivered?</p></div></div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {([{key:"fullName",label:"Full name",placeholder:"Your full name",type:"text"},{key:"email",label:"Email address",placeholder:"you@example.com",type:"email"},{key:"phone",label:"Phone number",placeholder:"+234 800 000 0000",type:"tel"},{key:"city",label:"City",placeholder:"e.g. Lagos",type:"text"},{key:"state",label:"State",placeholder:"e.g. Lagos State",type:"text"}] as const).map((field) => <label key={field.key} className="block text-sm font-semibold text-[#465249]">{field.label}<input required type={field.type} value={form[field.key]} onChange={(event) => update(field.key, event.target.value)} placeholder={field.placeholder} className="mt-2 w-full rounded-xl border border-[#dfe5dc] px-4 py-3 text-sm font-normal outline-none transition focus:border-[#91ad3c] focus:ring-2 focus:ring-[#91ad3c]/10" /></label>)}
                  <label className="block text-sm font-semibold text-[#465249] sm:col-span-2">Street address<input required value={form.address} onChange={(event) => update("address", event.target.value)} placeholder="House number, street and area" className="mt-2 w-full rounded-xl border border-[#dfe5dc] px-4 py-3 text-sm font-normal outline-none focus:border-[#91ad3c] focus:ring-2 focus:ring-[#91ad3c]/10" /></label>
                  <label className="block text-sm font-semibold text-[#465249] sm:col-span-2">Delivery note <span className="font-normal text-[#8a968d]">(optional)</span><textarea rows={3} value={form.deliveryNote} onChange={(event) => update("deliveryNote", event.target.value)} placeholder="Landmark or instructions for the delivery team" className="mt-2 w-full resize-y rounded-xl border border-[#dfe5dc] px-4 py-3 text-sm font-normal outline-none focus:border-[#91ad3c]" /></label>
                </div>
                {error && <p role="alert" className="mt-4 text-sm font-semibold text-[#a15d50]">{error}</p>}
              </div>
              <div className="rounded-2xl border border-[#e6eae3] bg-white p-5 sm:p-7"><h2 className="text-lg font-extrabold">Payment</h2><p className="mt-2 text-sm leading-6 text-[#69756c]">Payment methods will be connected in a later phase. This preview does not request or store card, bank or wallet credentials.</p><div className="mt-4 rounded-xl bg-[#f5f7f1] p-4 text-sm text-[#667268]">Payment gateway not connected</div></div>
            </section>
            <aside className="rounded-2xl border border-[#e6eae3] bg-white p-5 sm:p-6 lg:sticky lg:top-6"><h2 className="text-xl font-extrabold">Order summary</h2><div className="mt-4 space-y-3">{vendors.map((vendor) => <div key={vendor} className="border-b border-[#edf0eb] pb-3"><p className="text-xs font-bold text-[#59665d]">{vendor}</p>{items.filter((item) => item.vendor === vendor).map((item) => <div key={item.productId + JSON.stringify(item.options)} className="mt-2 flex justify-between gap-3 text-xs text-[#7a857d]"><span className="min-w-0">{item.name} × {item.quantity}</span><span className="shrink-0 font-semibold text-[#465249]">{formatNaira(item.price * item.quantity)}</span></div>)}</div>)}</div><div className="mt-4 space-y-3 text-sm"><div className="flex justify-between text-[#68746b]"><span>Items ({cartCount})</span><span>{formatNaira(subtotal)}</span></div><div className="flex justify-between text-[#68746b]"><span>Promo discount{couponCode ? ` (${couponCode})` : ""}</span><span className="font-semibold text-[#66852a]">−{formatNaira(couponDiscount)}</span></div><div className="flex justify-between text-[#68746b]"><span>Estimated delivery</span><span>{formatNaira(delivery)}</span></div></div><div className="my-5 border-t border-dashed border-[#dce2d9]" /><div className="flex justify-between text-lg font-black"><span>Total</span><span>{formatNaira(total)}</span></div><button type="submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#91b52b] px-5 py-4 text-sm font-extrabold text-[#17211b] hover:bg-[#a5c94a]">Review demo order <ArrowRight className="h-4 w-4" /></button><p className="mt-3 text-center text-[11px] leading-5 text-[#8a968d]">Demo only — this will not create a real order or charge you.</p></aside>
          </form>
        )}
      </div>
    </main>
  );
}
