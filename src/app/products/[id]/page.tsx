import { notFound } from "next/navigation";
import ProductDetails from "@/components/product-details";
import { getProductById } from "@/data/products";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) notFound();
  return <ProductDetails product={product} />;
}
