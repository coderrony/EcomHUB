'use client';

import AccountModal from '@/components/account/AccountModal';
import useAuthInfo from '@/hook/useAuthInfo';

import { useEffect, useState } from 'react';

function AccountPage() {
  const session = useAuthInfo();
  const [shipping, setShipping] = useState(null);
  const [billing, setBilling] = useState(null);

  const [isProfile, setIsProfile] = useState(false);
  const [isShipping, setIsShipping] = useState(false);
  const [isBilling, setIsBilling] = useState(false);

  useEffect(() => {
    if (session?.shippingAddress) {
      setShipping(session?.shippingAddress);
    } else {
      setShipping(null);
    }

    if (session?.billingAddress) {
      setBilling(session?.billingAddress);
    } else {
      setBilling(null);
    }
  }, [session]);

  return (
    <div>
      {isProfile && (
        <AccountModal
          isDialogOpen={isProfile}
          onChangeDialog={setIsProfile}
          title={'Personal Profile'}
          operation='profile'
        />
      )}
      {isShipping && (
        <AccountModal
          isDialogOpen={isShipping}
          onChangeDialog={setIsShipping}
          title={'Shipping Address'}
          operation='shipping'
        />
      )}
      {isBilling && (
        <AccountModal
          isDialogOpen={isBilling}
          onChangeDialog={setIsBilling}
          title={'Billing Address'}
          operation='billing'
        />
      )}
      <div className='container  items-start gap-6 pt-4 pb-16'>
        <div className=' grid grid-cols-3 gap-4 mx-auto max-w-5xl'>
          <div className='shadow rounded bg-white px-4 pt-6 pb-8'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-medium text-gray-800 text-lg'>
                Personal Profile
              </h3>
              <button
                onClick={() => setIsProfile(prev => !prev)}
                className='text-primary'>
                Edit
              </button>
            </div>
            <div className='space-y-1'>
              <h4 className='text-gray-700 font-medium'>
                {session?.firstName} {session?.lastName}
              </h4>
              <p className='text-gray-800'>{session?.email}</p>
              {session?.mobile?.number ? (
                <p className='text-gray-800'>{session?.mobile?.number}</p>
              ) : (
                <button
                  onClick={() => setIsProfile(prev => !prev)}
                  className='text-red-500'>
                  Add Mobile Number
                </button>
              )}
            </div>
          </div>

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

          <div className='shadow rounded bg-white px-4 pt-6 pb-8'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-medium text-gray-800 text-lg'>
                Billing address
              </h3>
              <button
                onClick={() => setIsBilling(prev => !prev)}
                className='text-primary'>
                {billing ? 'Edit' : 'ADD'}
              </button>
            </div>
            {billing && (
              <div className='space-y-1'>
                <h4 className='text-gray-700 font-medium'>
                  {session?.firstName} {session?.lastName}
                </h4>
                <p className='text-gray-800'>Address: {billing.address}</p>
                <p className='text-gray-800'>Address: {billing.city}</p>
                <p className='text-gray-800'>
                  Postal Code: {billing.postalCode}
                </p>
                <p className='text-gray-800'>
                  Mobile: {session?.mobile?.number}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
