'use client';
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { appearUserOrder } from "../allorders/_action/order.action"; // server action

export default function AllOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
    try {
      const data = await appearUserOrder(localStorage.getItem("id")!);
     
      const paidOrders = (data || []).filter(
        (order: any) => order.isPaid || order.paymentMethodType === "cash"
      );
      console.log(data);
      setOrders(paidOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="animate-spin size-20 text-gray-600" />
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Paid Orders</h1>

      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 mb-6 shadow">
            <h2 className="text-lg font-semibold mb-2">Order</h2>
            <p><strong>Paid At:</strong> {new Date(order.paidAt).toLocaleString()}</p>
            <p><strong>Total Price:</strong> {order.totalOrderPrice} EGP</p>

            <div className="mt-4 space-y-3">
              <strong>Items:</strong>
              {order.cartItems.map((item: any) => (
                <div key={item._id} className="flex items-center gap-4 border p-2 rounded">
                  <img
                    src={item.product?.imageCover}
                    alt={item.product?.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.product?.title}</p>
                    <p>Quantity: {item.count}</p>
                    <p>Price: {item.price} EGP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No paid orders found.</p>
      )}
    </div>
  );
}
