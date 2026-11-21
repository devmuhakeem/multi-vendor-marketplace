import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marketly — One marketplace. More possibilities.",
  description: "Discover great products from independent stores in one easy-to-shop marketplace."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}