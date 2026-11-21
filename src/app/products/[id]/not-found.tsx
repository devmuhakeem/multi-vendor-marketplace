import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function ProductNotFound() {
  return <main className="grid min-h-screen place-items-center bg-canvas px-6 text-center"><div><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#e9efdf] text-brand"><ShoppingBag size={25}/></span><h1 className="mt-5 text-3xl font-black">Product not found</h1><p className="mt-2 text-sm text-muted">This product may have been moved or is no longer available.</p><Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-xs font-bold text-white"><ArrowLeft size={14}/> Back to marketplace</Link></div></main>;
}
