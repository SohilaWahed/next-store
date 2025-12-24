"use server";

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

// ------------------- ADD TO CART -------------------
export async function addToCard(productId: string) {
  try {
    const accessToken = await getAccessToken();
    

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      headers: {
        token: accessToken+'',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
      cache: "no-store",
    });

    return await res.json();
  } catch (err) {
    console.error("Error in addToCard:", err);
    return { status: "error", message: "Failed to add to cart" };
  }
}

// ------------------- GET CART -------------------
export async function getCartAction() {
  try {
    const accessToken = await getAccessToken();
    
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "GET",
      headers: {
        token: accessToken +' ',
        "Content-Type": "application/json",
      },
   
    });

    return await res.json();
  } catch (error) {
    console.error("Error in getCartAction:", error);
    return { status: "error", message: "Failed to fetch cart" };
  }
}

// ------------------- REMOVE FROM CART -------------------
export async function removeFromCart(productId: string) {
  try {
    const accessToken = await getAccessToken();
    

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: accessToken+'',
          "Content-Type": "application/json",
        },
     
      }
    );

    return await res.json();
  } catch (err) {
    console.error("Error in removeFromCart:", err);
    return { status: "error", message: "Failed to remove from cart" };
  }
}

// ------------------- UPDATE CART -------------------
export async function updateCart(productId: string, count: number) {
  try {
    const accessToken = await getAccessToken();
   
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "PUT",
        headers: {
          token: accessToken +'',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count }),
      }
    );

    return await res.json();
  } catch (err) {
    console.error("Error in updateCart:", err);
    return { status: "error", message: "Failed to update cart" };
  }
}

// ------------------- CLEAR CART -------------------
export async function clearCart() {
  try {
    const accessToken = await getAccessToken();
    
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "DELETE",
      headers: {
        token: accessToken+' ',
        "Content-Type": "application/json",
      },
    
    });

    return await res.json();
  } catch (err) {
    console.error("Error in clearCart:", err);
    return { status: "error", message: "Failed to clear cart" };
  }
}
// =====================================ChangePassword============================

export async function ChangePasswordform(
  currentPassword: string,
  password: string,
  rePassword: string
) {
  try {
    const accessToken = await getAccessToken();
   

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      {
        method: "PUT",
        headers: {
          token: accessToken+'',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, password, rePassword }),
      }
    );
      const data= await res.json();
    return data
  } catch (err) {
    console.error("Error in ChangePasswordform:", err);
    return { status: "error", message: "Failed to change password" };
  }
}
// =====================================ChangeUserProfile============================

export async function ChangeUserData(
  name: string,
  email: string,
) {
  try {
    const accessToken = await getAccessToken();
    

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
      {
        method: "PUT",
        headers: {
          token: accessToken+' ',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name , email }),
      }
    );
      const data= await res.json();
      console.log('data of user' +data)
    return data
  } catch (err) {
    console.error("Error in ChangePasswordform:", err);
    return { status: "error", message: "Failed to change password" };
  }
}