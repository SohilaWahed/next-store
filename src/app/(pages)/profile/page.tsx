"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { ChangeUserData } from "../products/_action/addToCard.action";
import Link from "next/link";


// ---------------- Profile Component ----------------
export default function Profile() {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        You must be logged in to view this page
      </div>
    );
  }

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await ChangeUserData(name, email);

      if (res?.status === "success") {
        if (email === session.user?.email) {
            await signOut({ callbackUrl: "/login" });          
          setMessage(" Name updated successfully!");
        } else {
        
          setMessage("Email updated! Redirecting to login...");
          await signOut();
        }
      } else {
        setMessage(res?.message );
      }
    } catch (err) {
      console.error(err);
      setMessage(" Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-gray-100 space-x-6">
      {/* Display current user info */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-xl font-bold">{session.user?.name}</h1>
        <h2 className="text-gray-600">{session.user?.email}</h2>
      </div>

      {/* Edit form */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 cursor-pointer px-4 py-2 text-white font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

  {message && (
  <div className="flex flex-col justify-between">
    {message === "success" ? (
      <p className="mt-4 text-center text-sm font-medium text-green-600">
        {message}  Go to Logout and Then Login To log Again with new Email
        
      </p>
    ) : (
      <p className="mt-4 text-center text-sm font-medium text-red-600">
        {message }
      </p>
    )}
  </div>
)}
      </div>
    </div>
  );
}
