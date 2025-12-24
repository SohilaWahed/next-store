import { Params } from "next/dist/server/request/params";
import React from "react";
import Image from "next/image";
import { ProductsI } from "@/interfaces/products";
import api from "@/components/ui/Api/api";
import ADDTOCARD from '../../../../components/ui/ADDToCARD/ADDTOCARD';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface BrandsProps {
  params: Params;
}

export default async function Brands({ params }: BrandsProps) {
  const { brandid } = params;

  // Fetch the brand details
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${brandid}`,
    
  );

  const { data: brand }: { data: Brand } = await response.json();

  
  const products: ProductsI[] = await api();


  const filteredProducts = products.filter(
    (product) => product.brand?._id === brandid
  );

  return (
    <div className="p-6">
      {/* Brand Card */}
      <div className="flex justify-center items-center mb-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            {brand.name}
          </h1>
        </div>
      </div>

      {/* Products Section */}
      <h2 className="text-2xl font-bold mb-5 text-center">
        Products in {brand.name}
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found in this brand.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <Card key={product._id} className="shadow-md p-3 flex flex-col">
              <Link href={`/products/${product._id}`}>
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="w-full h-60 object-contain"
                />
                <CardHeader>
                  <CardTitle className="truncate">
                    {product.title.split(" ", 2).join(" ")}
                  </CardTitle>
                  <CardDescription>{product.brand?.name}</CardDescription>
                </CardHeader>
              </Link>

              <CardContent>
                <p className="text-gray-700 text-xl">
                  Price:{" "}
                  <span className="font-extrabold text-black">
                    ${product.price}
                  </span>
                </p>
              </CardContent>

               <ADDTOCARD productId={product.id} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
