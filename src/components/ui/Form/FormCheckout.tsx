'use client';
import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '../button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { checkoutServer, cashOrderServer, ShippingAddress } from './_action/form.action';
import { clearCart } from '@/app/(pages)/products/_action/addToCard.action';


export default function FormCheckout({ cartId }: { cartId: string }) {
  const inputDetails = useRef<HTMLInputElement>(null);
  const inputCity = useRef<HTMLInputElement>(null);
  const inputPhone = useRef<HTMLInputElement>(null);
  const { status } = useSession();
  const router = useRouter();

  const handleCheckout = async (isCash: boolean = false) => {
    if (status !== 'authenticated') {
      router.push('/login');
      return;
    }

    const shippingAddress: ShippingAddress = {
      details: inputDetails.current?.value || '',
      phone: inputPhone.current?.value || '',
      city: inputCity.current?.value || '',
    };

    if (!shippingAddress.details || !shippingAddress.phone || !shippingAddress.city) {
      toast.error('Please fill all shipping fields');
      return;
    }

    try {
      const data = isCash
        ? await cashOrderServer(cartId, shippingAddress)
        : await checkoutServer(cartId, shippingAddress);

      if (data.status === 'success') {
        if (isCash) {
          toast.success('Cash order placed successfully');
            window.location.href = '/allorders';
        } else {
          window.location.href = data.session.url;
        }
      } else {
        toast.error(isCash ? 'Cash order failed' : 'Checkout failed');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Something went wrong');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-7 py-6 me-5 cursor-pointer">
          Checkout
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>Enter your shipping information to proceed with payment.</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 py-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-2">
            <label htmlFor="details">Address Details</label>
            <input id="details" ref={inputDetails} className="border rounded-md p-2" required />
          </div>

          <div className="grid gap-2">
            <label htmlFor="phone">Phone</label>
            <input id="phone" ref={inputPhone} className="border rounded-md p-2" required />
          </div>

          <div className="grid gap-2">
            <label htmlFor="city">City</label>
            <input id="city" ref={inputCity} className="border rounded-md p-2" required />
          </div>

          <DialogFooter className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={() => handleCheckout(false)} className="cursor-pointer">
              Visa
            </Button>
            <Button type="button" onClick={() => handleCheckout(true)} className="cursor-pointer">
              Cash
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
