export type ProductOption = {
  label: string;
  values: string[];
};

export type Product = {
  id: number;
  name: string;
  vendor: string;
  price: number;
  old: number;
  rating: number;
  reviews: number;
  tag: string;
  image: string;
  images: string[];
  category: string;
  description: string;
  features: string[];
  options: ProductOption[];
  stockCount: number;
  wholesaleMinimum?: number;
};

export const products: Product[] = [
  {
    id: 1, name: "Everyday Classic Sneakers", vendor: "Northside Collective", price: 28500, old: 36000, rating: 4.8, reviews: 124, tag: "BESTSELLER", category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=90",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=90", "https://images.unsplash.com/photo-149鞋?w=1000&q=85", "https://images.unsplash.com/photo-1460353581641-37b add?w=1000&q=85"],
    description: "An easy-to-style everyday sneaker designed for comfort from morning errands to evening plans. A versatile addition to your everyday rotation.",
    features: ["Comfort-focused everyday fit", "Versatile casual styling", "Durable rubber outsole", "Easy to pair with everyday outfits"],
    options: [{ label: "Size", values: ["39", "40", "41", "42", "43", "44"] }, { label: "Colour", values: ["Red", "White", "Black"] }],
    stockCount: 18, wholesaleMinimum: 6
  },
  {
    id: 2, name: "Wireless Noise-Cancelling Headphones", vendor: "SoundHub Store", price: 64500, old: 78000, rating: 4.7, reviews: 89, tag: "HOT DEAL", category: "Phones & Tech",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=90",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=90", "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&q=85", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1000&q=85"],
    description: "Settle into your favourite playlists, podcasts and calls with a comfortable over-ear design. Made for focused listening at home, at work or while travelling.",
    features: ["Over-ear cushioned design", "Wireless Bluetooth connectivity", "Built-in microphone for calls", "Foldable storage-friendly design"],
    options: [{ label: "Colour", values: ["Black", "Cream", "Navy"] }],
    stockCount: 12, wholesaleMinimum: 5
  },
  {
    id: 3, name: "Minimal Ceramic Table Set", vendor: "The Home Edit", price: 42000, old: 50000, rating: 4.9, reviews: 56, tag: "NEW", category: "Home & Living",
    image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=900&q=90",
    images: ["https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=1000&q=90", "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1000&q=85", "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=1000&q=85"],
    description: "Bring a calm, considered feel to your table with this minimal ceramic set. Its simple finish makes it suitable for everyday meals and relaxed hosting.",
    features: ["Minimal ceramic finish", "Designed for everyday dining", "Easy-to-style neutral look", "A thoughtful home refresh"],
    options: [{ label: "Set", values: ["4 pieces", "8 pieces"] }, { label: "Colour", values: ["Ivory", "Sand"] }],
    stockCount: 9, wholesaleMinimum: 4
  },
  {
    id: 4, name: "Daily Glow Skincare Set", vendor: "Olive & Bloom", price: 19500, old: 25000, rating: 4.6, reviews: 203, tag: "POPULAR", category: "Beauty",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900&q=90",
    images: ["https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1000&q=90", "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=1000&q=85", "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1000&q=85"],
    description: "A simple skincare bundle for a refreshing daily routine. Check the product packaging for the complete ingredient list and usage guidance before use.",
    features: ["Convenient bundled routine", "Suitable for a simple daily regimen", "Gift-ready presentation", "Refer to packaging for ingredients and directions"],
    options: [{ label: "Bundle", values: ["Starter set", "Full set"] }],
    stockCount: 24
  },
  {
    id: 5, name: "Premium Everyday Backpack", vendor: "Carry Culture", price: 32000, old: 39000, rating: 4.8, reviews: 71, tag: "LIMITED", category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=90",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&q=90", "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=1000&q=85", "https://images.unsplash.com/photo-1581605405669-f9257c1c2f2c?w=1000&q=85"],
    description: "A practical everyday backpack with a clean profile and room for the essentials. A dependable companion for commutes, classes and short trips.",
    features: ["Everyday carry design", "Multiple storage compartments", "Adjustable shoulder straps", "Suitable for work, school and travel"],
    options: [{ label: "Colour", values: ["Olive", "Black", "Stone"] }],
    stockCount: 15, wholesaleMinimum: 5
  },
  {
    id: 6, name: "Smart Fitness Watch", vendor: "Gadget District", price: 58000, old: 69000, rating: 4.5, reviews: 112, tag: "DEAL", category: "Phones & Tech",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=90",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=90", "https://images.unsplash.com/photo-1501393091912-9e6d6f3b4b3f?w=1000&q=85", "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=1000&q=85"],
    description: "Keep everyday activity and notifications close at hand with a smart watch designed for daily wear. Review the included specifications for device compatibility.",
    features: ["Everyday smart-watch styling", "Activity and notification features", "Comfortable wrist strap", "Check compatibility before purchase"],
    options: [{ label: "Strap colour", values: ["Black", "Brown", "Silver"] }, { label: "Size", values: ["Regular", "Large"] }],
    stockCount: 11
  },
  {
    id: 7, name: "Soft Knit Lounge Chair", vendor: "The Home Edit", price: 118000, old: 145000, rating: 4.9, reviews: 38, tag: "TOP RATED", category: "Home & Living",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=900&q=90",
    images: ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1000&q=90", "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1000&q=85", "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=1000&q=85"],
    description: "Create a comfortable corner for reading or unwinding with this softly styled lounge chair. Its relaxed silhouette brings warmth to living spaces.",
    features: ["Relaxed lounge-chair silhouette", "Soft upholstered finish", "Designed for living spaces", "Pairs with contemporary interiors"],
    options: [{ label: "Colour", values: ["Oatmeal", "Charcoal", "Sage"] }],
    stockCount: 5
  },
  {
    id: 8, name: "Classic Leather Wristwatch", vendor: "Time & Form", price: 47500, old: 55000, rating: 4.7, reviews: 94, tag: "TRENDING", category: "Fashion",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=900&q=90",
    images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1000&q=90", "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1000&q=85", "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1000&q=85"],
    description: "A timeless wristwatch look with a leather-style strap and an understated dial. Designed to complement both casual and smart everyday outfits.",
    features: ["Classic analogue-inspired styling", "Leather-style strap", "Versatile everyday design", "Gift-friendly presentation"],
    options: [{ label: "Strap colour", values: ["Brown", "Black"] }],
    stockCount: 8
  }
];

export const getProductById = (id: number) => products.find((product) => product.id === id);
export const formatNaira = (amount: number) => "₦" + amount.toLocaleString("en-NG");
