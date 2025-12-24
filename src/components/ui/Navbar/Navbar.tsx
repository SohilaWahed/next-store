'use client'

import React, { useContext } from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2, ShoppingCart, UserIcon } from "lucide-react"
import { Badge } from "../badge"
import { AddCartContext } from "../Context/getcartconext"
import { useSession, signOut } from "next-auth/react"
import { Button } from "../button"

export default function NavMenu() {
  const { cart, isLoading } = useContext(AddCartContext)
  const session = useSession()

  return (
    <nav className="bg-gray-600 py-5 text-3xl text-white font-bold sticky top-0 z-50 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1>
            <Link href="/">ShopMart</Link>
          </h1>

          {/* Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/categories">Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/brands">Brands</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/user">ALL User</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/wishlist">WishList</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/allorder">All Orders</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/subcategories">Subcategories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {session.status === "authenticated" && <Link href="/changepassword">
             <Button
              type="button"
              className="w-full bg-white text-black cursor-pointer hover:bg-gray-400"
              
            >
              Change Password

            </Button>
            </Link>}
                     

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-0 text-3xl">
                <UserIcon className="cursor-pointer" />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {session.status === "authenticated" ? (
                  <>
                    
                     <Link href="/profile">
                      <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={() => signOut(
                        {
                          callbackUrl:'/'
                        }
                      )}
                      className="cursor-pointer"
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                   
                    <Link href="/login">
                      <DropdownMenuItem className="cursor-pointer">Login</DropdownMenuItem>
                    </Link>
                    <Link href="/register">
                      <DropdownMenuItem className="cursor-pointer">Register</DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
           {session.status === "authenticated" && (
  <div className="flex items-center gap-2 text-sm">
    <h2 className="font-medium text-shadow-emerald-800">
      {session.data?.user.name  || "Guest"}
    </h2>

    <Link href="/cartpage">
      <div className="relative ps-3 cursor-pointer">
        <ShoppingCart className="h-6 w-6" />
        <Badge className="w-5 h-5 rounded-full font-mono absolute -top-4 -right-4 flex items-center justify-center">
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span className="text-[10px]">
              {cart?.numOfCartItems ?? 0}
            </span>
          )}
        </Badge>
      </div>
    </Link>
  </div>
)}

          </div>
        </div>
      </div>
    </nav>
  )
}
