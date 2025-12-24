"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@heroui/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
    ),
});

export default function Resetpassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            newPassword: values.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
       
        router.push("/login"); 
      } else {
        setErrorMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again later.");
    }
  }

  return (
    <div className="flex justify-center items-center text-center h-[65vh]">
      <div className="card max-w-md p-5 w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-white p-6 rounded-lg shadow-md w-full"
          >
            {errorMessage && (
              <h1 className="text-red-600 text-2xl">{errorMessage}</h1>
            )}

            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="ahmed@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New password field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
            >
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
