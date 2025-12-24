"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { AddCartContext } from "../../../components/ui/Context/getcartconext";
import ADDTOCARD from "../../../components/ui/ADDToCARD/ADDTOCARD";
import toast from "react-hot-toast";
import { removeFromWishlist } from "../products/_action/wishlist.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 

export default function Wishlistpage() {
  const { isLoading2, wishlist, getwishlist, setWishlist } =
    useContext(AddCartContext);
  

  const [removing, setRemoving] = useState<string | null>(null);
  const savedCount = useRef<number | null>(null);
  const session = useSession();
const router = useRouter();
  async function removewishlist(productId: string) {
    if (session.status === "authenticated") {
      try {
        setRemoving(productId);

        const data = await removeFromWishlist(productId);
        if (data.status === "success") {
          setWishlist(data);
          toast.success("Item removed from wishlist");
        } else {
          toast.error("Failed to remove item");
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setRemoving(null);
      }
    } else {
      router.push("/login");
    }
  }


  useEffect(() => {
    getwishlist();
    if (wishlist?.count !== undefined) {
      savedCount.current = wishlist.count;
    }
  }, [getwishlist, wishlist]);

  const wishlistProducts = wishlist?.data || [];
  const totalItems = wishlist?.count || 0;

  return (
    <div className="container mx-auto py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">
          WishList Page
        </h1>
        <div className="text-gray-500">
          You have{" "}
          {removing ? (
            <Loader2 className="inline animate-spin w-5 h-5" />
          ) : (
            `${savedCount.current ?? 0} items in your wishlist`
          )}
        </div>
      </div>

      {/* Wishlist Products */}
      <div className="grid gap-6">
        {wishlistProducts.length > 0 ? (
          wishlistProducts.map((product) => (
            <Card
              key={product._id}
              className="flex flex-col md:flex-row items-center justify-between p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-lg font-semibold">
                      {product.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 text-gray-500">
                    <p>Price: {product.price} EGP</p>
                    <p className="text-sm text-gray-400">
                      Category: {product.category?.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      Subcategory: {product.subcategory?.[0]?.name}
                    </p>
                  </CardContent>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex justify-center">
                <ADDTOCARD productId={product._id} isInWishlistPage />
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-6">
        <Link href="/products">
          <button className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow cursor-pointer hover:bg-gray-900 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
