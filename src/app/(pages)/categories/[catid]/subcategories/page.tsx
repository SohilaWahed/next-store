import { Category } from '@/interfaces/category';
import { Subcategory } from '@/interfaces/subcategory';
import { Params } from 'next/dist/server/request/params';
import React from 'react'
interface SubCategoryPageProps {
  params: Params;
}
export default async function subcategories({ params }: SubCategoryPageProps)
 {
   const { catid } = params;
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${catid}/subcategories`,
      
    );
    const { data: category }: { data: Subcategory} = await response.json();
    console.log(category)
  return (
   <>
   
   
   
   </>
  )
}
