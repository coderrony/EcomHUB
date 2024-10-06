'use client';

import AccountModal from '@/components/account/AccountModal';
import CheckoutOrder from '@/components/checkout/CheckoutOrder';

import useAuthInfo from '@/hook/useAuthInfo';
import { useEffect, useState } from 'react';

function CheckoutPage() {
  const session = useAuthInfo();
  const [shipping, setShipping] = useState(null);
  const [isShipping, setIsShipping] = useState(false);

  useEffect(() => {
    if (session?.shippingAddress) {
      setShipping(session?.shippingAddress);
    } else {
      setShipping(null);
    }
  }, [session]);
  return (
    <div className='container'>
      {isShipping && (
        <AccountModal
          isDialogOpen={isShipping}
          onChangeDialog={setIsShipping}
          title={'Shipping Address'}
          operation='shipping'
        />
      )}
      <div className='grid md:grid-cols-3  px-4'>
        <div className=' md:col-span-2 p-8'>
          <div className='shadow rounded bg-white px-4 pt-6 pb-8'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-medium text-gray-800 text-lg'>
                Shipping address
              </h3>
              <button
                className='text-primary'
                onClick={() => setIsShipping(prev => !prev)}>
                {shipping ? 'Edit' : 'ADD'}
              </button>
            </div>
            {shipping && (
              <div className='space-y-1'>
                <h4 className='text-gray-700 font-medium'>
                  {session?.firstName} {session?.lastName}
                </h4>
                <p className='text-gray-800'>Address: {shipping.address}</p>
                <p className='text-gray-800'>Address: {shipping.city}</p>
                <p className='text-gray-800'>
                  Postal Code: {shipping.postalCode}
                </p>
                <p className='text-gray-800'>
                  Mobile: {session?.mobile?.number}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className='  mt-8 md:col-span-1'>
          <CheckoutOrder shipping={shipping} setIsShipping={setIsShipping} />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
