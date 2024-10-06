'use client';

import CartDetails from '@/components/cart/CartDetails';

import useAddToCart from '@/hook/useAddToCart';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function CartPage() {
  const [myCart, setMyCart] = useState(null);
  const router = useRouter();
  const { cart } = useAddToCart();
  useEffect(() => {
    setMyCart(cart);
  }, [cart]);
  return (
    <div>
      {myCart?.length > 0 ? (
        <CartDetails cart={myCart} />
      ) : (
        <div className='max-w-md mx-auto text-center p-10'>
          <h1 className='text-2xl text-zinc-500'>Empty Cart</h1>
          <button
            className='p-3 text-xs text-white bg-primary max-w-sm mt-2'
            onClick={() => router.push('/shop')}>
            Add Product To Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
