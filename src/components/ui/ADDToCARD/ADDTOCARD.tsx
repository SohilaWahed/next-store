'use client'
import React, { useContext, useState } from 'react'
import { CardFooter } from '../card'
import { HeartIcon, Loader2, ShoppingCartIcon, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { AddCartContext } from '../Context/getcartconext'
import {addToCard} from '../../../app/(pages)/products/_action/addToCard.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


import {
  addToWishlist,
  removeFromWishlist,
} from '../../../app/(pages)/products/_action/wishlist.action'
import { CartResponse } from '@/interfaces/cart'

export default function AddToCart({
  productId,
  isInWishlistPage = false,
}: {
  productId: string
  isInWishlistPage?: boolean
}) {
  const [isCartLoading, setIsCartLoading] = useState(false)
  const [isWishlistLoading, setIsWishlistLoading] = useState(false)
  const router = useRouter()
  const { setCart, setWishlist } = useContext(AddCartContext)
  const session = useSession()

async function handleAddToCart() {
  if (session.status === 'authenticated') {
    try {
      setIsCartLoading(true)
      const data = await addToCard(productId)
        
      if (data.status === 'success') {
        setCart(data) 
        toast.success('Product added to cart')
        if (isInWishlistPage) await handleRemoveFromWishlist()
      } else {
        toast.error('Failed to add to cart')
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setIsCartLoading(false)
    }
  } else {
    router.push('/login')
  }
}


  async function handleAddToWishlist() {
     if (session.status === 'authenticated') {
    try {

      setIsWishlistLoading(true)
      const data = await addToWishlist(productId) 
      setWishlist(data)

      if (data.status === 'success') {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setIsWishlistLoading(false)
    }
  }
  else
  {
    router.push('login')
  }
  }

  async function handleRemoveFromWishlist() {
    if (session.status === 'authenticated') {
    try {
       

      setIsWishlistLoading(true)
      const data = await removeFromWishlist(productId)
      setWishlist(data)

      if (data.status === 'success') {
        toast.success('Removed from wishlist')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsWishlistLoading(false)
    }
  }
  else
  {
    router.push('/login')
  }
  }

  return (
    <CardFooter className="flex gap-2 mt-auto">
      <button
        disabled={isCartLoading}
        onClick={handleAddToCart}
        className="flex items-center justify-center bg-black text-white p-2 cursor-pointer rounded hover:bg-gray-800 transition"
      >
        {isCartLoading ? (
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
        ) : (
          <ShoppingCartIcon className="h-5 w-5 mr-2" />
        )}
        Add to Cart
      </button>

      <button
        className="rounded cursor-pointer"
        onClick={
          isInWishlistPage ? handleRemoveFromWishlist : handleAddToWishlist
        }
        disabled={isWishlistLoading}
      >
        {isWishlistLoading ? (
          <Loader2 className="animate-spin h-6 w-6 mr-2" />
        ) : isInWishlistPage ? (
          <Trash2 className="ms-5 w-6 h-6 text-red-600" />
        ) : (
          <HeartIcon className="size-10 hover:text-red-600" />
        )}
      </button>
    </CardFooter>
  )
}
