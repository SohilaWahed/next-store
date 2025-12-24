'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { AddCartContext } from '../../../components/ui/Context/getcartconext'
import Loading from '../../loading'
import toast from 'react-hot-toast'
import FormCheckout from '../../../components/ui/Form/FormCheckout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { clearCart, removeFromCart, updateCart as updateCartApi } from '../products/_action/addToCard.action'

export default function CartPage() {
  const { isLoading, cart, getcart, setCart } = useContext(AddCartContext)
  const [removing, setRemoving] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const [clear, setClear] = useState<boolean>(false)

  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!cart || typeof cart?.data?.products?.[0]?.product === 'string') {
      getcart()
    }
  }, [cart, getcart])

  async function removeCart({ productId }: { productId: string }) {
    if (session.status === 'authenticated') {
      setRemoving(productId)
      try {
        const data = await removeFromCart(productId)
        if (data.status === 'success') {
          toast.success('Removed successfully')
          setCart(data)
        } else {
          toast.error('Failed to remove item')
        }
      } catch (err) {
        console.error(err)
        toast.error('Something went wrong')
      } finally {
        setRemoving(null)
      }
    } else {
      router.push('/login')
    }
  }

  async function updateCartHandler({ productId, count }: { productId: string; count: number }) {
    if (session.status === 'authenticated') {
      setUpdating(productId)
      try {
        const data = await updateCartApi(productId, count)
        if (data.status === 'success') {
          toast.success('Update successful')
          setCart(data)
        } else {
          toast.error('Failed to update')
        }
      } catch (err) {
        console.error(err)
        toast.error('Something went wrong')
      } finally {
        setUpdating(null)
      }
    } else {
      router.push('/login')
    }
  }

  async function Clear() {
    if (session.status === 'authenticated') {
      setClear(true)
      try {
        const data = await clearCart()
        if (data.message === 'success') {
          toast.success('Cart cleared')
          await getcart()
        } else {
          toast.error('Failed to clear cart')
        }
      } catch (error) {
        console.error(error)
        toast.error('Something went wrong')
      } finally {
        setClear(false)
      }
    } else {
      router.push('/login')
    }
  }

  const cartProducts = cart?.data?.products || []
  const totalPrice = cart?.data?.totalCartPrice || 0
  const totalItems = cart?.numOfCartItems || 0

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">Shopping Cart</h1>
        <h2 className="text-xl mt-3 text-gray-600">
          Total Price:{' '}
          <span className="font-bold text-green-600 pe-5">{totalPrice} EGP</span>
          Number of Items: <span className="font-bold">{totalItems}</span>
        </h2>
      </div>

      {isLoading ? (
        <Loading />
      ) : totalItems > 0 ? (
        <div className="grid gap-6">
          {cartProducts.map((product) =>
            typeof product.product === 'object' ? (
              <Card
                key={product._id}
                className="flex flex-col md:flex-row items-center justify-between p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.product.imageCover}
                    alt={product.product.title}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div>
                    <CardHeader className="p-0">
                      <CardTitle className="text-lg font-semibold">{product.product.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 text-gray-500">
                      <p>Price: {product.price} EGP</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() =>
                            updateCartHandler({ productId: product.product._id, count: product.count - 1 })
                          }
                          disabled={product.count === 1}
                          className="size-8 rounded-lg cursor-pointer border hover:bg-accent me-2"
                        >
                          -
                        </button>
                        <p className="flex">
                          Quantity:{' '}
                          {updating === product.product._id ? (
                            <Loader2 className="w-4 h-4 text-center animate-spin mt-1" />
                          ) : (
                            product.count
                          )}
                        </p>
                        <button
                          onClick={() =>
                            updateCartHandler({ productId: product.product._id, count: product.count + 1 })
                          }
                          className="size-8 rounded-lg cursor-pointer border hover:bg-accent me-2"
                        >
                          +
                        </button>
                      </div>
                    </CardContent>
                  </div>
                </div>
                <button
                  onClick={() => removeCart({ productId: product.product._id })}
                  className="mt-4 md:mt-0 text-red-500 cursor-pointer hover:text-red-700 disabled:opacity-50"
                >
                  {removing === product.product._id ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Trash2 className="w-6 h-6" />
                  )}
                </button>
              </Card>
            ) : null
          )}
        </div>
      ) : (
        <div className="text-center flex justify-center items-center flex-col min-h-[200px]">
          <h1>No Carts</h1>
          <Link href="/products">
            <button className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow cursor-pointer hover:bg-gray-700 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}

      {totalItems > 0 && (
        <div className="flex justify-end mt-6">
          <button
            onClick={Clear}
            disabled={clear}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg me-4 shadow cursor-pointer hover:bg-gray-700 transition"
          >
            {clear ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Clear'}
          </button>
          <FormCheckout cartId={cart?.cartId!} />

          <Link href="/products">
            <button
              disabled={clear}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow cursor-pointer hover:bg-gray-700 transition"
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
