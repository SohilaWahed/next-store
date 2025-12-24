'use server';
import { cookies } from 'next/headers';
import { decode } from 'next-auth/jwt';

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}


export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value;

  if (!sessionToken) return null;

  const decoded: any = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  // Return the token field from the decoded JWT (if it exists)
  return decoded?.token || null;
}


export async function checkoutServer(cartId: string, shippingAddress: ShippingAddress) {
  const accessToken = await getAccessToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_URL}`,
    {
      method: 'POST',
      headers: {
        token: accessToken +' ',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shippingAddress),
    }
  );

  return res.json();
}

export async function cashOrderServer(cartId: string, shippingAddress: ShippingAddress) {
  const accessToken = await getAccessToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method: 'POST',
      headers: {
        token: accessToken +' ',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shippingAddress),
    }
  );

  return res.json();
}
