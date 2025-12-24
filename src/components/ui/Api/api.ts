// api.ts
import { ProductsI } from "@/interfaces/products";

export default async function api(): Promise<ProductsI[]> {
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
  
  });
  const { data }: { data: ProductsI[] } = await response.json();
  return data;
}
