'use server'

import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'

async function getAccessToken() {
  const raw = (await cookies()).get('next-auth.session-token')?.value 
        

  const decoded: any = await decode({
    token: raw,
    secret: process.env.NEXTAUTH_SECRET!,
  })

  
  return decoded?.token
}

export async function addToWishlist(productId: string) {
  const accesstoken = await getAccessToken()

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
    method: 'POST',
    body: JSON.stringify({ productId }),
    headers: {
      token: accesstoken,
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}

export async function removeFromWishlist(productId: string) {
  const accesstoken = await getAccessToken()

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: 'DELETE',
      headers: {
        token: accesstoken,
      },
    }
  )

  return response.json()
}

export async function getWishlist() {
  const accesstoken = await getAccessToken()

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
    headers: {
      token: accesstoken,
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}
