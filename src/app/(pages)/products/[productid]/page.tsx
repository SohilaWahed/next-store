import { ProductsI } from "@/interfaces/products";
import { Params } from "next/dist/server/request/params";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ADDTOCARD from '../../../../components/ui/ADDToCARD/ADDTOCARD'
import React from "react";
import Image from "next/image";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import Carsol from "@/components/ui/Carsol/carsol";

interface ProductPageProps {
  params: Params;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productid } = params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productid}`,
    
  );

  const { data: details }: { data: ProductsI } = await response.json();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <Card className="grid md:grid-cols-2 gap-8 shadow-lg p-6">
        {/* Product Image */}
        <div className="flex justify-center items-center">
         <Carsol images={details.images} title={details.title}/>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between mt-15">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              {details.title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {details.brand.name}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-gray-700 mb-4">{details.description}</p>
            <p className="text-sm text-gray-500">
              Category: <span className="font-medium">{details.category.name}</span>
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-yellow-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 
                  5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 
                  3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 
                  1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527
                  c-.887-.76-.415-2.212.749-2.305l5.404-.434 
                  2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold text-lg">
                {details.ratingsAverage} / 5
              </span>
              <span className="text-sm text-gray-500">
                ({details.ratingsQuantity} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="mt-6 text-2xl font-bold text-gray-800">
              Price: ${details.price} EGP
            </p>
          </CardContent>

          <ADDTOCARD productId={details._id} />
        </div>
      </Card>
    </main>
  );
}
