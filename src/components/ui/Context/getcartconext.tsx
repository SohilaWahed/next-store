'use client'

import { CartResponse } from '@/interfaces/cart'
import { Whishlist } from '@/interfaces/wishlist'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { createContext, ReactNode, useEffect, useState } from 'react'


import { getWishlist } from '../../../app/(pages)/products/_action/wishlist.action'
import { getCartAction } from '@/app/(pages)/products/_action/addToCard.action'
import { any } from 'zod/v3'

interface CartContextType {
  cart: CartResponse | null
  isLoading: boolean
  getcart: () => void
  getwishlist: () => void
  setCart: (value: CartResponse | null) => void
  setIsLoading: (value: boolean) => void
  wishlist: Whishlist | null
  setWishlist: (value: Whishlist | null) => void
  isLoading2: boolean
  setIsLoading2: (value: boolean) => void
}

export const AddCartContext = createContext<CartContextType>({
  cart: null,
  isLoading: false,
  getcart: () => {},
  getwishlist: () => {},
  setCart: () => {},
  setIsLoading: () => {},
  wishlist: null,
  setWishlist: () => {},
  isLoading2: false,
  setIsLoading2: () => {},
})

export default function GetcartconextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartResponse | null>(null)
  const [wishlist, setWishlist] = useState<Whishlist | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoading2, setIsLoading2] = useState<boolean>(false)
  const session = useSession()
  const router = useRouter()

  // ---------------- CART ----------------
  async function getcart() {
    if (session.status === 'authenticated') {
      try {
        setIsLoading(true)
         const data = await getCartAction();
      
        setCart(data)

        if (data?.data?.cartOwner) {
          localStorage.setItem('id', data.data.cartOwner)
        }

        console.log('Cart data:', data)
      } catch (err) {
        console.error('Error fetching cart:', err)
      } finally {
        setIsLoading(false)
      }
    } else {
      router.push('/login')
    }
  }

  // ---------------- WISHLIST ----------------
  async function getwishlist() {
    if(session.status=='authenticated')
    {
    try {
      setIsLoading2(true)
      const data = await getWishlist() 
      setWishlist(data)
      console.log('Wishlist data:', data)
    } catch (err) {
      console.error('Error fetching wishlist:', err)
    } finally {
      setIsLoading2(false)
    }
  }
  else{
    router.push('/login')
  }
  }

  
  useEffect(() => {
    if (session.status === 'authenticated') {
      getcart()
      getwishlist()
    }
  }, [session.status])

  return (
    <AddCartContext.Provider
      value={{
        cart,
        isLoading,
        getcart,
        setCart,
        setIsLoading,
        wishlist,
        getwishlist,
        setWishlist,
        isLoading2,
        setIsLoading2,
      }}
    >
      {children}
    </AddCartContext.Provider>
  )
}
