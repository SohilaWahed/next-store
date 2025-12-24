 
 'user server'
 
 import React from 'react'
 
 export default async function formlogin(email:string) {
     try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert(`Success: ${data.message}`);
        console.log("Data:", data.data);
      } else {
        alert(`Error: ${data.message}`);
        console.error("Error:", data.message);
      }
    } catch (err) {
      alert("Network error. Please try again later.");
      console.error("Network error:", err);
    }
   
 }
 
 
 
