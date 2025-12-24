import { NextRequest, NextResponse } from "next/server"

 import { cookies } from 'next/headers'
  import { decode } from 'next-auth/jwt'
export async function GET()
{
  
    const x = (await cookies()).get('next-auth.session-token')?.value;
    const accesstoken = await decode({
      token : x,
      secret: process.env.NEXTAUTH_SECRET!,
    })
   const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: accesstoken+" ",
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
    return NextResponse.json(data)
}
