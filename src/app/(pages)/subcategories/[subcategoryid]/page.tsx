import api from "@/components/ui/Api/api";
import { ProductsI } from "@/interfaces/products";
import { Params } from "next/dist/server/request/params";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ADDTOCARD from '../../../../components/ui/ADDToCARD/ADDTOCARD'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import { Subcategory } from "@/interfaces/subcategory";

interface SubCategoryPageProps {
  params: Params;
}

export default async function Subcategories({ params }: SubCategoryPageProps) {
  const { subcategoryid } = params;

  
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/subcategories/${subcategoryid}`,
    { cache: "no-store" }
  );
  const { data: subcategory }: { data: Subcategory } = await response.json();

  
  const products: ProductsI[] = await api();


  const filteredProducts = products.filter(
    (product) => product.subcategory[0].name === subcategory.name
  );

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {subcategory.name} Subcategory
      </h1>

      {/* Subcategory Info */}
      <div className="container mx-auto px-6 py-10 flex justify-center items-center">
        <div className="bg-gray-200 rounded-xl shadow hover:shadow-lg transition p-6 w-6/12 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {subcategory.name}
          </h2>
          <p className="text-gray-500 pb-5">{subcategory.slug}</p>

         
        </div>
      </div>

      {/* Products Section */}
      <h2 className="text-2xl font-bold mb-5 text-center">
        Products in {subcategory.name}
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found in this subcategory.
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
                  <CardDescription>
                    {product.category?.name}
                  </CardDescription>
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
