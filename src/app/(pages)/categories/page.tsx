import { Category } from '@/interfaces/category';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from 'react'
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default async function Categories() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
  const { data: category }: { data: Category[] } = await response.json();
  console.log(category);

  return (
    <>
      <div className="flex justify-center items-center text-center text-4xl text-gray-600 font-extrabold mb-8">
        ALL Categories
      </div>

      {/* Responsive grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 container px-6">
        {category.map((cat) => (
         <Link href={'/categories/'+cat._id}>
           <Card 
            key={cat._id} 
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <CardHeader>
              <CardTitle className="text-3xl text-gray-600 font-semibold">{cat.name}</CardTitle>
             
               
            </CardHeader>

            <CardFooter>
              {cat.image?
              <Image 
                src={cat.image} 
                width={400} 
                height={400} 
                alt={cat.name} 
                className="w-full h-48 object-cover rounded-md"
              
              />:<Loader2/>}
             
            </CardFooter>
             <CardDescription className="text-gray-700 text-2xl font-bold text-center">({cat.slug})</CardDescription>
          </Card>
         </Link>
        ))}
      </div>
    </>
  );
}
