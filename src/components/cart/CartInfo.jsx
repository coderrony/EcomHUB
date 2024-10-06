'use client';

import useAddToCart from '@/hook/useAddToCart';
import Image from 'next/image';

function CartInfo({ cart }) {
  const { increaseCartQty, decreaseCartQty, removeFromCart } = useAddToCart();

  const handleIncreaseRemoveCart = () => {
    if (cart?.quantity > 1) {
      decreaseCartQty(cart?.id, cart?.price);
    } else {
      removeFromCart(cart?.id, cart?.productName);
    }
  };
  return (
    <div className='bg-zinc-100 text-zinc-800 flex flex-row m-2 p-2'>
      <div className='w-32 '>
        <Image
          src={cart?.image}
          alt={cart?.productName}
          width={70}
          height={70}
        />
      </div>
      <div className=' w-full px-2'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl'>{cart?.productName}</h2>
          <h2 className='font-bold font-roboto'>${cart?.amount}</h2>
        </div>
        <div className='flex justify-between items-center mt-2'>
          <div className='flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max'>
            <button
              className='h-8 w-8 text-sm flex items-center justify-center cursor-pointer select-none'
              onClick={handleIncreaseRemoveCart}>
              -
            </button>
            <div className='h-8 w-8 text-sm flex items-center justify-center'>
              {cart.quantity}
            </div>
            <button
              className='h-8 w-8 text-sm flex items-center justify-center cursor-pointer select-none'
              onClick={() => increaseCartQty(cart?.id, cart.price)}>
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(cart?.id, cart?.productName)}
            className='underline text-base'>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartInfo;
