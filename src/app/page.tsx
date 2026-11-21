"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/components/cart-provider";
import {
  ArrowRight, Search, ShoppingBag, Menu, Heart, Star, Truck, ShieldCheck,
  Headphones, ChevronRight, Store, BadgePercent, X, SlidersHorizontal
} from "lucide-react";

const categories = [
  { name: "Fashion", icon: "✳", color: "bg-[#f8e8dd]" },
  { name: "Phones & Tech", icon: "▣", color: "bg-[#e3eafa]" },
  { name: "Home & Living", icon: "⌂", color: "bg-[#e8eddf]" },
  { name: "Beauty", icon: "✿", color: "bg-[#f5e4ef]" },
  { name: "Groceries", icon: "◈", color: "bg-[#f5edda]" },
  { name: "Sports", icon: "◉", color: "bg-[#e0eeeb]" },
  { name: "Kids", icon: "☆", color: "bg-[#f5e8d8]" },
  { name: "More", icon: "＋", color: "bg-[#e9e9e5]" }
];

const vendors = [
  { name: "Northside Collective", type: "Fashion & accessories", initials: "NC", color: "bg-[#e8d9c9]", rating: "4.9", products: "128 products" },
  { name: "The Home Edit", type: "Home, furniture & decor", initials: "HE", color: "bg-[#dce8d8]", rating: "4.8", products: "86 products" },
  { name: "SoundHub Store", type: "Electronics & gadgets", initials: "SH", color: "bg-[#dce4f4]", rating: "4.9", products: "214 products" }
];

const money = (amount: number) => "₦" + amount.toLocaleString("en-NG");

export default function HomePage() {
  const { addItem, cartCount } = useCart();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesQuery = (product.name + " " + product.vendor).toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [activeCategory, query]);

  const addToCart = (id: number) => {
    const product = products.find((item) => item.id === id);
    if (product) {
      const defaultOptions = Object.fromEntries(product.options.map((option) => [option.label, option.values[0]]));
      addItem(product, defaultOptions);
    }
    setNotice("Added to your cart");
    window.setTimeout(() => setNotice(""), 1800);
  };

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="bg-ink text-white">
        <div className="container-shell flex min-h-9 items-center justify-center gap-2 text-center text-[11px] font-medium tracking-wide sm:text-xs">
          <BadgePercent size={14} className="text-lime" />
          <span>THE BIG DISCOVERY SALE IS ON — save more when you shop more.</span>
          <a href="#deals" className="hidden items-center gap-1 text-lime sm:inline-flex">Explore deals <ArrowRight size={13} /></a>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f7f8f4]/95 backdrop-blur-xl">
        <div className="container-shell flex h-[76px] items-center justify-between gap-5">
          <a href="#" className="flex shrink-0 items-center gap-2.5" aria-label="Marketly home">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand text-lime"><ShoppingBag size={21} /></span>
            <span className="text-[22px] font-black tracking-[-1.2px]">marketly<span className="text-brand">.</span></span>
          </a>

          <nav className="hidden items-center gap-7 text-[13px] font-semibold text-ink/75 lg:flex">
            <a className="transition hover:text-brand" href="#categories">Categories</a>
            <a className="transition hover:text-brand" href="#deals">Today's deals</a>
            <a className="transition hover:text-brand" href="#vendors">Stores</a>
            <a className="transition hover:text-brand" href="#wholesale">Wholesale</a>
          </nav>

          <div className="hidden max-w-[390px] flex-1 items-center rounded-full border border-black/10 bg-white px-4 py-2.5 md:flex">
            <Search size={17} className="shrink-0 text-muted" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, brands and stores..." className="w-full bg-transparent px-3 text-xs outline-none placeholder:text-muted/75" />
            <kbd className="rounded-md bg-canvas px-2 py-1 text-[10px] text-muted">⌘ K</kbd>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button aria-label="Wishlist" className="hidden h-10 w-10 place-items-center rounded-full transition hover:bg-black/5 sm:grid"><Heart size={19} /></button>
            <button className="relative flex h-10 items-center gap-2 rounded-full bg-brand px-4 text-xs font-bold text-white transition hover:bg-[#105737]">
              <ShoppingBag size={16} /> <span className="hidden sm:inline">My bag</span>
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1 text-[10px] font-black text-ink">{cartCount}</span>
            </button>
            <button aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)} className="grid h-10 w-10 place-items-center rounded-full border border-black/10 lg:hidden">{mobileMenu ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
        {mobileMenu && <div className="container-shell grid gap-1 border-t border-black/5 py-4 text-sm font-semibold lg:hidden">{["Categories", "Today's deals", "Stores", "Wholesale"].map((item) => <a key={item} href={item === "Stores" ? "#vendors" : item === "Today's deals" ? "#deals" : item === "Wholesale" ? "#wholesale" : "#categories"} onClick={() => setMobileMenu(false)} className="rounded-xl px-3 py-3 hover:bg-white">{item}</a>)}</div>}
      </header>

      <section className="container-shell pb-14 pt-8 sm:pt-12">
        <div className="relative grid min-h-[440px] overflow-hidden rounded-[30px] bg-[#e9efdf] lg:grid-cols-[1.02fr_.98fr]">
          <div className="relative z-10 flex flex-col items-start justify-center px-7 py-12 sm:px-12 lg:px-16">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/70 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[1.7px] text-brand"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> A better way to shop</span>
            <h1 className="max-w-[540px] text-[43px] font-black leading-[1.04] tracking-[-2.6px] sm:text-[58px] lg:text-[64px]">Good finds.<br /><span className="text-brand">Great people.</span><br />One marketplace.</h1>
            <p className="mt-5 max-w-[390px] text-sm leading-6 text-ink/65">Discover products you love from independent stores you can trust. Everything you need, all in one place.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#featured" className="inline-flex items-center gap-3 rounded-full bg-brand px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-brand/15 transition hover:-translate-y-0.5 hover:bg-[#105737]">Start exploring <ArrowRight size={16} /></a>
              <a href="#vendors" className="rounded-full border border-ink/15 bg-white/60 px-6 py-3.5 text-xs font-bold transition hover:bg-white">Meet our stores</a>
            </div>
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">{["#c98f69", "#8b9c75", "#d8b9a5", "#7b8ea8"].map((c, i) => <span key={i} style={{ backgroundColor: c }} className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#e9efdf] text-[10px] font-bold text-white">{["A", "M", "T", "K"][i]}</span>)}</div>
              <p className="text-[11px] text-ink/65"><strong className="text-ink">2,500+</strong> shoppers finding their next favourite</p>
            </div>
          </div>
          <div className="relative min-h-[300px] lg:min-h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e9efdf] via-transparent to-transparent lg:z-10" />
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=90" alt="Beautifully curated modern retail store" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-7 left-6 z-20 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-soft backdrop-blur sm:bottom-10 sm:left-8">
              <p className="text-[9px] font-bold uppercase tracking-[1.5px] text-muted">Your next great find</p>
              <p className="mt-1 text-sm font-extrabold">It’s closer than you think.</p>
            </div>
          </div>
          <span className="absolute -right-10 -top-12 h-48 w-48 rounded-full border-[30px] border-white/20" />
        </div>
      </section>

      <section id="categories" className="container-shell pb-16">
        <div className="mb-6 flex items-end justify-between">
          <div><p className="text-[10px] font-extrabold uppercase tracking-[2px] text-brand">Browse your way</p><h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Shop by category</h2></div>
          <a href="#featured" className="hidden items-center gap-1 text-xs font-bold text-brand sm:flex">View all <ArrowRight size={15} /></a>
        </div>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8">
          {categories.map((category) => <button key={category.name} onClick={() => { setActiveCategory(category.name === "More" ? "All" : category.name); document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" }); }} className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-3 transition hover:-translate-y-1 hover:shadow-soft sm:p-4">
            <span className={`grid aspect-square w-full max-w-[88px] place-items-center rounded-2xl text-3xl transition group-hover:scale-105 ${category.color}`}>{category.icon}</span>
            <span className="text-center text-[10px] font-bold sm:text-xs">{category.name}</span>
          </button>)}
        </div>
      </section>

      <section id="deals" className="container-shell pb-16">
        <div className="relative grid overflow-hidden rounded-[26px] bg-ink text-white md:grid-cols-[1fr_auto]">
          <div className="relative z-10 px-7 py-8 sm:px-10 sm:py-10">
            <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[2px] text-lime"><BadgePercent size={15} /> Limited-time offers</span>
            <h2 className="mt-3 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">More in your cart.<br /><span className="text-lime">More value in your pocket.</span></h2>
            <p className="mt-3 max-w-md text-xs leading-5 text-white/60">Look out for bundle offers, buy-one-get-more deals, coupons and special prices from your favourite stores.</p>
            <a href="#featured" className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-xs font-extrabold text-ink transition hover:bg-white">Shop the offers <ArrowRight size={15} /></a>
          </div>
          <div className="relative hidden min-h-[260px] w-[310px] items-center justify-center md:flex">
            <div className="absolute right-10 top-8 h-44 w-44 rounded-full border border-white/15" /><div className="absolute right-16 top-14 h-32 w-32 rounded-full border border-white/15" />
            <div className="relative z-10 rotate-[-8deg] rounded-[26px] bg-lime p-6 text-ink shadow-2xl"><p className="text-[10px] font-black uppercase tracking-[2px]">Bundle & save</p><p className="mt-1 text-5xl font-black tracking-[-3px]">2+1</p><p className="mt-1 text-xs font-bold">More reasons to smile.</p></div>
          </div>
          <span className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-brand/40 blur-3xl" />
        </div>
      </section>

      <section id="featured" className="container-shell pb-20">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-[10px] font-extrabold uppercase tracking-[2px] text-brand">Handpicked for you</p><h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">The good stuff</h2><p className="mt-1 text-xs text-muted">Great products from stores worth knowing.</p></div>
          <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold"><SlidersHorizontal size={14} /><select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} className="max-w-[125px] bg-transparent outline-none"><option>All</option>{categories.filter(c => c.name !== "More").map(c => <option key={c.name}>{c.name}</option>)}</select></div>
        </div>
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {["All", "Fashion", "Phones & Tech", "Home & Living", "Beauty"].map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-bold transition ${activeCategory === category ? "bg-brand text-white" : "bg-white text-muted hover:bg-[#e9efdf]"}`}>{category}</button>)}
        </div>
        {visibleProducts.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {visibleProducts.map((product) => <article key={product.id} className="product-card group overflow-hidden rounded-[20px] bg-white shadow-[0_2px_14px_rgba(22,40,28,.035)] transition hover:-translate-y-1 hover:shadow-soft">
            <div className="relative aspect-[1/1.02] overflow-hidden bg-[#eceee9]">
              <Link href={`/products/${product.id}`} aria-label={`View ${product.name}`}><img src={product.image} alt={product.name} className="product-image h-full w-full object-cover" /></Link>
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1.5 text-[8px] font-black tracking-[1px] text-brand backdrop-blur">{product.tag}</span>
              <button aria-label="Add to wishlist" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-ink transition hover:bg-white hover:text-rose-500"><Heart size={15} /></button>
              <button onClick={() => addToCart(product.id)} className="absolute bottom-3 left-3 right-3 flex translate-y-2 items-center justify-center gap-2 rounded-full bg-ink/95 py-2.5 text-[10px] font-bold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 max-sm:hidden"><ShoppingBag size={13} /> Add to bag</button>
            </div>
            <div className="p-3 sm:p-4">
              <p className="truncate text-[9px] font-semibold text-muted">{product.vendor}</p>
              <h3 className="mt-1 line-clamp-2 min-h-[34px] text-[11px] font-bold leading-4 sm:text-xs"><Link href={`/products/${product.id}`} className="hover:text-brand">{product.name}</Link></h3>
              <div className="mt-2 flex items-center gap-1 text-[9px] text-muted"><Star size={11} className="fill-[#e6b94d] text-[#e6b94d]" /><strong className="text-ink">{product.rating}</strong><span>({product.reviews})</span></div>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5"><span className="text-sm font-black">{money(product.price)}</span><span className="text-[9px] text-muted line-through">{money(product.old)}</span></div>
              <button onClick={() => addToCart(product.id)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-brand/20 py-2 text-[10px] font-bold text-brand transition hover:bg-brand hover:text-white sm:hidden"><ShoppingBag size={12} /> Add to bag</button>
            </div>
          </article>)}
        </div> : <div className="rounded-2xl bg-white p-10 text-center"><p className="font-bold">No products found</p><p className="mt-1 text-xs text-muted">Try another search or category.</p><button onClick={() => { setQuery(""); setActiveCategory("All"); }} className="mt-4 text-xs font-bold text-brand">Clear filters</button></div>}
        <div className="mt-8 text-center"><button onClick={() => { setActiveCategory("All"); setQuery(""); }} className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-xs font-bold transition hover:border-brand hover:text-brand">Explore all products <ArrowRight size={15} /></button></div>
      </section>

      <section id="wholesale" className="container-shell pb-20">
        <div className="grid overflow-hidden rounded-[26px] bg-[#e4eadd] md:grid-cols-2">
          <div className="flex flex-col items-start justify-center px-7 py-10 sm:px-12">
            <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[1.5px] text-brand">For business buyers</span>
            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl">Buying for more<br />than just yourself?</h2>
            <p className="mt-3 max-w-sm text-xs leading-6 text-ink/65">Access wholesale pricing, bulk quantities and seller offers designed to help your business grow.</p>
            <a href="#vendors" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-xs font-bold text-white transition hover:bg-[#105737]">Explore wholesale <ArrowRight size={15} /></a>
          </div>
          <div className="relative min-h-[260px]"><img src="https://images.unsplash.com/photo-1586521737605-8a2a7a3b5c4e?w=1000&q=85" alt="Organised wholesale inventory and packages" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-[#e4eadd] via-transparent to-transparent" /></div>
        </div>
      </section>

      <section id="vendors" className="container-shell pb-20">
        <div className="mb-7 flex items-end justify-between"><div><p className="text-[10px] font-extrabold uppercase tracking-[2px] text-brand">The people behind the products</p><h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Meet the stores</h2></div><a href="#vendors" className="hidden items-center gap-1 text-xs font-bold text-brand sm:flex">Discover all stores <ArrowRight size={15} /></a></div>
        <div className="grid gap-4 md:grid-cols-3">
          {vendors.map((vendor) => <article key={vendor.name} className="flex items-center gap-4 rounded-[20px] border border-black/5 bg-white p-5 transition hover:-translate-y-1 hover:shadow-soft">
            <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-lg font-black text-ink ${vendor.color}`}>{vendor.initials}</div>
            <div className="min-w-0 flex-1"><h3 className="truncate text-sm font-extrabold">{vendor.name}</h3><p className="mt-1 truncate text-[10px] text-muted">{vendor.type}</p><div className="mt-2 flex items-center gap-2 text-[10px]"><span className="flex items-center gap-1 font-bold"><Star size={11} className="fill-[#e6b94d] text-[#e6b94d]" /> {vendor.rating}</span><span className="text-muted">· {vendor.products}</span></div></div>
            <button aria-label={`View ${vendor.name}`} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-canvas text-brand transition hover:bg-brand hover:text-white"><ChevronRight size={16} /></button>
          </article>)}
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-[22px] bg-ink px-6 py-7 text-center text-white sm:flex-row sm:px-9 sm:text-left">
          <div className="flex items-center gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-lime text-brand"><Store size={22} /></span><div><h3 className="text-base font-extrabold">Have a store of your own?</h3><p className="mt-1 text-[11px] text-white/55">Bring your products to a community of ready-to-shop customers.</p></div></div>
          <a href="mailto:hello@marketly.example" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-lime px-5 py-3 text-[11px] font-extrabold text-ink transition hover:bg-white">Become a seller <ArrowRight size={14} /></a>
        </div>
      </section>

      <section className="container-shell pb-16">
        <div className="grid gap-4 rounded-[24px] border border-black/5 bg-white p-6 sm:grid-cols-3 sm:p-8">
          {[{icon: Truck, title:"Delivery that works for you", text:"Convenient delivery options from stores to your doorstep."},{icon:ShieldCheck,title:"Shop with confidence",text:"A marketplace experience built around trust and transparency."},{icon:Headphones,title:"Here when you need us",text:"Helpful support when you have a question or need a hand."}].map(({icon: Icon,title,text}) => <div key={title} className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e9efdf] text-brand"><Icon size={19}/></span><div><h3 className="text-xs font-extrabold">{title}</h3><p className="mt-1 text-[10px] leading-5 text-muted">{text}</p></div></div>)}
        </div>
      </section>

      <footer className="bg-ink text-white">
        <div className="container-shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div><a href="#" className="flex items-center gap-2 text-xl font-black tracking-tight"> <span className="grid h-9 w-9 place-items-center rounded-xl bg-lime text-brand"><ShoppingBag size={18}/></span> marketly<span className="text-lime">.</span></a><p className="mt-4 max-w-[260px] text-xs leading-6 text-white/50">A marketplace for discovering good products and the independent stores behind them.</p></div>
          <div><h4 className="text-xs font-extrabold">Explore</h4><div className="mt-4 grid gap-3 text-[11px] text-white/55"><a href="#categories" className="hover:text-lime">Categories</a><a href="#deals" className="hover:text-lime">Deals & offers</a><a href="#vendors" className="hover:text-lime">Stores</a><a href="#wholesale" className="hover:text-lime">Wholesale</a></div></div>
          <div><h4 className="text-xs font-extrabold">Sell on Marketly</h4><div className="mt-4 grid gap-3 text-[11px] text-white/55"><a href="#vendors" className="hover:text-lime">Become a seller</a><a href="#vendors" className="hover:text-lime">Seller guidelines</a><a href="#vendors" className="hover:text-lime">Seller support</a></div></div>
          <div><h4 className="text-xs font-extrabold">Need help?</h4><div className="mt-4 grid gap-3 text-[11px] text-white/55"><a href="mailto:hello@marketly.example" className="hover:text-lime">Contact us</a><a href="#top" className="hover:text-lime">FAQs</a><a href="#top" className="hover:text-lime">Delivery & returns</a></div></div>
        </div>
        <div className="border-t border-white/10"><div className="container-shell flex flex-col gap-2 py-5 text-[10px] text-white/35 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Marketly. All rights reserved.</p><p>Built for better everyday shopping.</p></div></div>
      </footer>

      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-xs font-bold text-white shadow-2xl">{notice}</div>}
    </main>
  );
}