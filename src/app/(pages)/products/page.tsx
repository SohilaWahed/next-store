
import { ProductsI } from '@/interfaces/products';
import ADDTOCARD from '../../../components/ui/ADDToCARD/ADDTOCARD';
import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { HeartIcon } from 'lucide-react';
import Link from 'next/link';

export default async function Products() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
  const { data: products }: { data: ProductsI[] } = await response.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
      {products.map((product) => (
        <Card key={product._id} className="shadow-md p-3 flex flex-col">
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.imageCover}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-60 object-contain"
            />

            <CardHeader>
              <CardTitle className="truncate">
                {product.title.split(' ', 2).join(' ')}
              </CardTitle>
              <CardDescription>
                {product.category?.name}
              </CardDescription>
              <CardAction>
                {product.brand?.name}
              </CardAction>
            </CardHeader>

            <CardAction className="p-2 text-center">
              SubCategory: {product.subcategory?.[0]?.name || "N/A"}
            </CardAction>

            <CardContent>
              {/* Rating */}
              <p className="text-gray-700 flex justify-between mb-4">
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-300">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-300">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-300">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-300">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                  </svg>
                </div>
                {product.ratingsAverage}
              </p>

              {/* Price */}
              <p className="text-gray-700 text-2xl">
                Price:
                <span className="font-extrabold text-black">
                  ${product.price}
                </span>
              </p>
            </CardContent>
          </Link>

          {/* Add to cart button */}
          <CardFooter>
            <ADDTOCARD productId={product.id} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
