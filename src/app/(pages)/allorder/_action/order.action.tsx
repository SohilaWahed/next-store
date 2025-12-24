'use server'

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

// ------------------- HELPER -------------------
async function getAccessToken() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value;

  if (!sessionToken) return null;

  const decoded = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return decoded?.token as string | null;
}

// =================== FETCH ORDERS ====================
export async function appearOrder() {
  try {
    const accessToken = await getAccessToken();
    

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders`,
      {
        method: "GET",
        headers: {
          token: accessToken +' ',
          "Content-Type": "application/json",
        },
      }
    );

    const data=await response.json()
    console.log(data.data)
    return data.data ;
  } catch (err) {
    console.error("Error in addToCard:", err);
    return { status: "error", message: "Failed to add to cart" };
  }
}
