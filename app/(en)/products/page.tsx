import { ProductsHub, productsMeta } from "@/components/pages/products";

export const metadata = productsMeta("en");

export default function Page() {
  return <ProductsHub locale="en" />;
}
