"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Profile from "../profile/page";

// ✅ Validation schema
const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    phone: z
      .string()
      .regex(/^[0-9]{10,15}$/, "Phone must be 10–15 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    repassword: z.string(),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords do not match",
    path: ["repassword"], 
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Form submitted:", data);

    // Simulate API call
    await new Promise((res) => setTimeout(res, 1000));

    // Redirect if valid
    router.push("/api/auth/signin");
  };
  const [signup, setSignup] = useState(false)
  async function Signup(formData: {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}) {
    setSignup(true);

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), 
      }
    );

    const data = await response.json();
    console.log("Signup response:", data);

   
    setSignup(false);
  
}


  return (
    <div className="flex items-center justify-center min-h-screen rounded-2xl ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 rounded-lg shadow-md w-96 bg-gray-600 text-white"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        {/* Username */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="w-full px-3 py-2 border rounded cursor-pointer text-black"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full px-3 py-2 border rounded cursor-pointer text-black"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-3">
          <input
            type="tel"
            placeholder="Phone"
            {...register("phone")}
            className="w-full px-3 py-2 border rounded cursor-pointer text-black"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full px-3 py-2 border rounded cursor-pointer text-black"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Re-enter Password */}
        <div className="mb-3">
          <input
            type="password"
            placeholder="Re-enter Password"
            {...register("repassword")}
            className="w-full px-3 py-2 border rounded cursor-pointer text-black"
          />
          {errors.repassword && (
            <p className="text-red-500 text-sm">{errors.repassword.message}</p>
          )}
        </div>

        <button
          type="submit"
        
          className="w-full bg-blue-500 text-white py-2 rounded cursor-pointer  hover:bg-blue-600 transition"
        >
          Register
        </button>
      </form>
      
    </div>
  );
}
