"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Check, ChevronRight, Heart, Minus, Plus,
  ShoppingBag, Star, Truck, ShieldCheck, RotateCcw, Store
} from "lucide-react";
import { formatNaira, products, type Product } from "@/data/products";
import { useCart } from "@/components/cart-provider";

export default function ProductDetails({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const { addItem, cartCount } = useCart();

  const discount = Math.round((1 - product.price / product.old) * 100);
  const missingOption = product.options.find((option) => !selected[option.label]);

  const handleAddToCart = () => {
    if (missingOption) {
      setNotice(`Please select ${missingOption.label.toLowerCase()} first.`);
      return;
    }
    addItem(product, selected, quantity);
    setNotice("Added to your bag.");
    window.setTimeout(() => setNotice(""), 2200);
  };

  const related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3);

  return (
    <main className="min-h-screen pb-16">
      <div className="bg-ink text-white"><div className="container-shell flex min-h-9 items-center justify-center text-center text-[11px] font-medium">Discovery deals are on — find something good today.</div></div>
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f7f8f4]/95 backdrop-blur-xl">
        <div className="container-shell flex h-[72px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand text-lime"><ShoppingBag size={21}/></span><span className="text-[22px] font-black tracking-[-1.2px]">marketly<span className="text-brand">.</span></span></Link>
          <Link href="/" className="hidden text-xs font-semibold text-muted hover:text-brand sm:block">Continue shopping</Link>
          <Link href="/#featured" className="relative flex h-10 items-center gap-2 rounded-full bg-brand px-4 text-xs font-bold text-white"><ShoppingBag size={16}/> My bag <span className="grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1 text-[10px] font-black text-ink">{cartCount}</span></Link>
        </div>
      </header>

      <div className="container-shell">
        <nav className="flex items-center gap-2 overflow-hidden py-6 text-[10px] font-semibold text-muted">
          <Link href="/" className="shrink-0 hover:text-brand">Home</Link><ChevronRight size={12}/><Link href="/#categories" className="shrink-0 hover:text-brand">{product.category}</Link><ChevronRight size={12}/><span className="truncate text-ink">{product.name}</span>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <div>
            <div className="relative overflow-hidden rounded-[26px] bg-[#eceee9]">
              <img src={product.images[activeImage] || product.image} alt={product.name} className="aspect-square w-full object-cover"/>
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-black tracking-[1px] text-brand">{product.tag}</span>
              <span className="absolute right-4 top-4 rounded-full bg-ink px-3 py-1.5 text-[9px] font-bold text-white">{discount}% OFF</span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {product.images.map((image, index) => <button key={image} onClick={() => setActiveImage(index)} aria-label={`View product image ${index + 1}`} className={`overflow-hidden rounded-2xl border-2 bg-white transition ${activeImage === index ? "border-brand" : "border-transparent hover:border-black/15"}`}><img src={image} alt={`${product.name} view ${index + 1}`} className="aspect-square w-full object-cover"/></button>)}
            </div>
          </div>

          <div className="lg:pt-2">
            <p className="text-[10px] font-extrabold uppercase tracking-[2px] text-brand">{product.category}</p>
            <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-1.2px] sm:text-4xl">{product.name}</h1>
            <Link href="/#vendors" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-brand"><Store size={14}/> Sold by <span className="font-bold text-ink">{product.vendor}</span><ChevronRight size={13}/></Link>
            <div className="mt-5 flex items-center gap-2"><span className="flex items-center gap-1 text-sm font-extrabold"><Star size={15} className="fill-[#e6b94d] text-[#e6b94d]"/>{product.rating}</span><span className="text-xs text-muted">{product.reviews} customer reviews</span><span className="text-muted">·</span><span className="text-xs font-semibold text-brand">Verified store</span></div>

            <div className="mt-6 flex flex-wrap items-baseline gap-3"><span className="text-3xl font-black tracking-tight">{formatNaira(product.price)}</span><span className="text-base text-muted line-through">{formatNaira(product.old)}</span><span className="rounded-full bg-[#e9efdf] px-3 py-1 text-[10px] font-extrabold text-brand">Save {formatNaira(product.old - product.price)}</span></div>
            <p className="mt-5 text-sm leading-7 text-ink/65">{product.description}</p>

            <div className="mt-6 space-y-5">
              {product.options.map((option) => <div key={option.label}><div className="mb-2 flex items-center gap-2 text-xs font-extrabold">{option.label}<span className="font-medium text-muted">— choose one</span></div><div className="flex flex-wrap gap-2">{option.values.map((value) => <button key={value} onClick={() => setSelected((current) => ({ ...current, [option.label]: value }))} className={`rounded-full border px-4 py-2.5 text-xs font-bold transition ${selected[option.label] === value ? "border-brand bg-brand text-white" : "border-black/10 bg-white text-ink hover:border-brand"}`}>{value}</button>)}</div></div>)}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex h-12 items-center rounded-full border border-black/10 bg-white">
                <button aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="grid h-11 w-11 place-items-center text-muted disabled:opacity-30"><Minus size={15}/></button>
                <span className="w-7 text-center text-sm font-extrabold tabular-nums">{quantity}</span>
                <button aria-label="Increase quantity" disabled={quantity >= product.stockCount} onClick={() => setQuantity((value) => Math.min(product.stockCount, value + 1))} className="grid h-11 w-11 place-items-center text-muted disabled:opacity-30"><Plus size={15}/></button>
              </div>
              <span className="text-xs font-semibold text-brand">{product.stockCount > 0 ? `${product.stockCount} available` : "Out of stock"}</span>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={handleAddToCart} disabled={product.stockCount < 1} className="flex min-h-13 flex-1 items-center justify-center gap-2 rounded-full bg-brand px-5 py-4 text-xs font-extrabold text-white transition hover:bg-[#105737] disabled:cursor-not-allowed disabled:opacity-50"><ShoppingBag size={17}/> Add to bag</button>
              <button aria-label="Add to wishlist" className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-black/10 bg-white transition hover:border-rose-300 hover:text-rose-500"><Heart size={19}/></button>
            </div>
            {notice && <p role="status" className="mt-3 rounded-xl bg-[#e9efdf] px-4 py-3 text-xs font-bold text-brand">{notice}</p>}

            <div className="mt-7 grid gap-3 border-t border-black/5 pt-6 sm:grid-cols-3">
              {[{icon:Truck,title:"Delivery options",text:"Shown at checkout"},{icon:ShieldCheck,title:"Secure shopping",text:"Protected checkout"},{icon:RotateCcw,title:"Easy support",text:"Help when you need it"}].map(({icon: Icon,title,text}) => <div key={title} className="flex items-start gap-2"><Icon size={17} className="mt-0.5 shrink-0 text-brand"/><div><p className="text-[10px] font-extrabold">{title}</p><p className="mt-1 text-[9px] text-muted">{text}</p></div></div>)}
            </div>
            {product.wholesaleMinimum && <div className="mt-6 rounded-2xl border border-brand/15 bg-[#e9efdf] p-4"><p className="text-xs font-extrabold text-brand">Buying for your business?</p><p className="mt-1 text-[11px] leading-5 text-ink/65">Wholesale options are planned for this store. Minimum order quantity: {product.wholesaleMinimum} units.</p></div>}
          </div>
        </section>

        <section className="mt-16 grid gap-8 border-t border-black/5 pt-10 md:grid-cols-[1fr_1fr]">
          <div><p className="text-[10px] font-extrabold uppercase tracking-[2px] text-brand">Product overview</p><h2 className="mt-2 text-2xl font-black">A little more detail</h2><p className="mt-4 text-sm leading-7 text-ink/65">{product.description}</p></div>
          <div><h3 className="text-sm font-extrabold">Product highlights</h3><ul className="mt-4 grid gap-3">{product.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-xs text-ink/70"><span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#e9efdf] text-brand"><Check size={11}/></span>{feature}</li>)}</ul></div>
        </section>

        {related.length > 0 && <section className="mt-16"><div className="mb-6 flex items-end justify-between"><div><p className="text-[10px] font-extrabold uppercase tracking-[2px] text-brand">Keep exploring</p><h2 className="mt-2 text-2xl font-black">You may also like</h2></div><Link href="/#featured" className="inline-flex items-center gap-1 text-xs font-bold text-brand">View all <ArrowRight size={14}/></Link></div><div className="grid grid-cols-2 gap-4 sm:grid-cols-3">{related.map((item) => <Link key={item.id} href={`/products/${item.id}`} className="group overflow-hidden rounded-2xl bg-white transition hover:-translate-y-1 hover:shadow-soft"><div className="overflow-hidden bg-[#eceee9]"><img src={item.image} alt={item.name} className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"/></div><div className="p-4"><p className="text-[9px] text-muted">{item.vendor}</p><h3 className="mt-1 text-xs font-bold">{item.name}</h3><p className="mt-2 text-sm font-black">{formatNaira(item.price)}</p></div></Link>)}</div></section>}
      </div>
      <footer className="mt-20 bg-ink py-8 text-center text-[10px] text-white/45">© 2026 Marketly. Discover good products from independent stores.</footer>
      {notice.startsWith("Added") && <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-xs font-bold text-white shadow-2xl">Added to your bag</div>}
    </main>
  );
}
