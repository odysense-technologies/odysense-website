import { ProductsHub, productsMeta } from "@/components/pages/products";

export const metadata = productsMeta("ar");

export default function Page() {
  return <ProductsHub locale="ar" />;
}
