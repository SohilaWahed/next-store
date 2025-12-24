import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Category } from '@/interfaces/category';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import  ADDTOCARD from '../../../components/ui/ADDToCARD/ADDTOCARD' 
export default  async function brands() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
    const { data: brands }: { data: Category[] } = await response.json();
    console.log(brands);
  return (
    <>
     <div className="flex justify-center items-center text-center text-4xl text-gray-600 font-extrabold mb-8">
        ALL Brands
      </div>

      {/* Responsive grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 container px-6">
        {brands.map((brand) => (
         <Link href={'/brands/'+brand._id}>
           <Card
            key={brand._id} 
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <CardHeader>
             
             
            </CardHeader>

            <CardFooter>
              {brand.image?
              <Image 
                src={brand.image} 
                width={400} 
                height={400} 
                alt={brand.name} 
                className="w-full h-48 object-cover rounded-md"
              
              />:<Loader2/>}
             
            </CardFooter>
             <CardDescription className="text-gray-700 text-2xl font-bold text-center">({brand.slug})</CardDescription>
          </Card>
         </Link>
        ))}
      </div>
    </>
  )
}
