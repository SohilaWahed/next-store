import { Button } from "@/components/ui/button";
import { ShoppingBasketIcon, SmileIcon } from "lucide-react";
import { Butcherman } from "next/font/google";

import Image from "next/image";
import Link from "next/link";



export default function Home() {
  return (
   <>
  <main className="mt-20 flex flex-col items-center justify-center  text-center px-6">
     <span><SmileIcon className="size-20"></SmileIcon></span>
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
        Welcome to <span className="text-gray-600">Shop Mark</span>
      </h1>

      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
        Discover the best deals on fashion, electronics, and more.  
        Your one-stop shop for everything you need.
      </p>

      
      <Link href="/products">
        <Button className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-black font-semibold px-8 py-3 rounded-xl text-lg shadow-md transition">
          <ShoppingBasketIcon className="size-5"/> Go Shopping
        </Button>
      </Link>

     
    </main>
   </>
  );
}
