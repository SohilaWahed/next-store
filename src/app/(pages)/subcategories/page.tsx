import { Category } from '@/interfaces/category';
import React from 'react';
import Link from 'next/link';

export default async function Subcategories() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/subcategories', {
    
  });

  const { data: subcategories }: { data: Category[] } = await response.json();
  console.log(subcategories);

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        All Subcategories
      </h1>

      {subcategories.length === 0 ? (
        <p className="text-center text-gray-500">No subcategories found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {subcategories.map((sub) => (
            <Link
              key={sub._id}
              href={`/subcategories/${sub._id}`}
              className="block bg-gray-200 rounded-xl shadow hover:shadow-lg transition p-6 text-center"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {sub.name}
              </h2>
              <p className="text-gray-500">{sub.slug}</p>
              <div className="text-gray-700 text-xs font-bold border-white border-t-1 mt-2  flex justify-between">
                <p className='mt-4'>{sub.createdAt?.split("T")[0]}</p>
                <p className='mt-4' >{sub.updatedAt?.split("T")[0]}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
