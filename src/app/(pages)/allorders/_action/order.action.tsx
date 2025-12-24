'use server'

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

// ------------------- HELPER -------------------
async function getAccessToken() {
  const cookieStore = await cookies();

  const sessionToken =
    cookieStore.get("next-auth.session-token")?.value 

  
  const decoded = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return decoded?.token as string | null;
}
export async function appearUserOrder(userId: string) {
  try {
    const accessToken = await getAccessToken();
    

    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
        {
          method: "GET",
          headers: {
            token: accessToken+' ',
            "Content-Type": "application/json",
          },
        }
      );


    return await response.json();
  } catch (err) {
    console.error("Error in addToCard:", err);
    return { status: "error", message: "Failed to add to cart" };
  }
}