"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
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
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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

export function LoginOfForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callback") ?? "/products";
  const errorMessage = searchParams.get("error");

  const [forgotPasswordMessage, setForgotPasswordMessage] = useState<string | null>(null);
  const [resetCode, setResetCode] = useState("");
  const [showResetInput, setShowResetInput] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState<"login" | "forgot" | "verify" | null>(null);

  // ----------------- LOGIN -----------------
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setActiveButton("login");
    try {
      await signIn("credentials", {
        redirect: true,
        callbackUrl,
        email: values.email,
        password: values.password,
      });
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
      setActiveButton(null);
    }
  }

  // ----------------- FORGOT PASSWORD -----------------
  async function forgotPassword(email: string) {
    setLoading(true);
    setActiveButton("forgot");
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
        setForgotPasswordMessage(`Success: ${data.message}`);
        setShowResetInput(true);
      } else {
        setForgotPasswordMessage(`Error: ${data.message}`);
      }
    } catch (err) {
      setForgotPasswordMessage("Network error. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
      setActiveButton(null);
    }
  }

  // ----------------- VERIFY RESET CODE -----------------
  async function verifyResetCode(code: string) {
    setLoading(true);
    setActiveButton("verify");
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetCode: code }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setForgotPasswordMessage(`Code verified: ${data.status}`);
        window.location.href = "/resetpassword";
      } else {
        setForgotPasswordMessage(`Error: ${data.status}`);
      }
    } catch (err) {
      setForgotPasswordMessage("Network error. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
      setActiveButton(null);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        {errorMessage && (
          <h1 className="text-red-600 text-2xl">{errorMessage}</h1>
        )}

        {/* Email Field */}
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

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
        >
          {loading && activeButton === "login" ? "Loading..." : "Login"}
        </Button>

        {/* Change Password Button */}
        <Link href="/changepassword">
          <Button
            type="button"
            className="w-full bg-green-600 text-white cursor-pointer hover:bg-green-700"
          >
            Change Password
          </Button>
        </Link>

        {/* Forgot Password Button */}
        <Button
          type="button"
          variant="link"
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={async () => {
            const email = form.getValues("email").trim();
            if (!email) {
              setForgotPasswordMessage("Please enter your email to reset password.");
              return;
            }
            try {
              formSchema.pick({ email: true }).parse({ email });
              await forgotPassword(email);
            } catch {
              setForgotPasswordMessage("Please enter a valid email.");
            }
          }}
        >
          {loading && activeButton === "forgot" ? "Loading..." : "Forgot Password?"}
        </Button>

        {/* Reset Code Input (appears after forgot password success) */}
        {showResetInput && (
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Enter reset code"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
            />
            <Button
              type="button"
              className="w-full bg-green-600 text-white cursor-pointer hover:bg-green-700"
              onClick={() => verifyResetCode(resetCode.trim())}
            >
              {loading && activeButton === "verify" ? "Loading..." : "Verify Reset Code"}
            </Button>
          </div>
        )}

        {/* Display Messages */}
        {forgotPasswordMessage && (
          <p
            className={`text-sm mt-2 ${
              forgotPasswordMessage.toLowerCase().includes("success") ||
              forgotPasswordMessage.toLowerCase().includes("code verified")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {forgotPasswordMessage}
          </p>
        )}
      </form>
    </Form>
  );
}
