import { Category } from "@/interfaces/category";
import { ProductsI } from "@/interfaces/products";
import { Params } from "next/dist/server/request/params";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ADDTOCARD from '../../../../components/ui/ADDToCARD/ADDTOCARD'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ShoppingCartIcon, HeartIcon } from "lucide-react";
import api from "@/components/ui/Api/api";

interface CategoryPageProps {
  params: Params;
}

export default async function CategoryDetails({ params }: CategoryPageProps) {
  const { catid } = params;

  // Fetch category info
  const categoryResponse = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${catid}`,
    
  );
  const { data: category }: { data: Category } = await categoryResponse.json();

  
  const products: ProductsI[] = await api();

  
  const filteredProducts = products.filter(
    (product) => product.category?.name === category.name
  );

  return (
    <div className="p-6">
      {/* Category Card */}
      <div className="flex justify-center items-center mb-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            {category.name}
          </h1>
        </div>
      </div>

      {/* Products Section */}
      <h2 className="text-2xl font-bold mb-5 text-center">
        Products in {category.name}
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found in this category.
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
                  <CardDescription>Category : {product.category?.name}</CardDescription>
                  <CardDescription>SubCategory : {product.subcategory[0].name}</CardDescription>
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
