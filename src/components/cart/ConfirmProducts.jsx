'use client';

import useAddToCart from '@/hook/useAddToCart';
import { useRouter } from 'next/navigation';

function ConfirmProducts() {
  const router = useRouter();
  const { cart } = useAddToCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.amount, 0) + 120; //delivery charge

  return (
    <div className='mt-3 px-8'>
      <div className='flex justify-between'>
        <p>Total:</p>
        <p className='font-bold'>${parseFloat(totalAmount.toFixed(2))}</p>
      </div>
      <div className='flex justify-between'>
        <p>Delivery Charge:</p>
        <p className='font-bold'>$120</p>
      </div>

      <p className='my-2'>
        * Delivery charges might very depending on product size and weight
      </p>
      <div className=' flex justify-center items-center'>
        <button
          className='bg-zinc-600 text-zinc-50 rounded w-full  py-2'
          onClick={() => router.push('/checkout')}>
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default ConfirmProducts;
