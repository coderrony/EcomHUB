'use client';

import { useForm } from 'react-hook-form';
import Spinner from '../common/Spinner';
import { useState } from 'react';
import useAuthInfo from '@/hook/useAuthInfo';
import { signIn } from 'next-auth/react';
import useToastHook from '@/hook/useToastHook';
function AccountForm({ operation, setModal }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const auth = useAuthInfo();
  const [loading, setLoading] = useState(false);
  const showToast = useToastHook();

  const { firstName, lastName, email, city, postCode, address, phone } = errors;


  const handleForm = async event => {
    setLoading(true);
    try {
      const res = await fetch('/api/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...event, operation, id: auth?.id }),
      });
      const responseData = await res.json();

      if (responseData?.status === 200) {
        await signIn('credentials', {
          ...responseData?.user,
          isLogin: false,
          redirect: false, // Use `redirect: false` to handle the response manually
        });
        showToast({
          variant: 'toastSuccess',
          title: `${operation} details`,
          description: responseData?.message,
        });
      } else {
        showToast({
          variant: 'toastDanger',
          title: `${operation} details`,
          description: responseData?.message,
        });
      }
    } catch (err) {
      showToast({
        variant: 'toastDanger',
        title: `Wrong!`,
        description: 'invalid credentials',
      });
    }
    setModal(false);
    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleForm)}>
        <div>
          <div className='flex justify-between gap-2'>
            <div className='min-h-[102px] w-full'>
              <label htmlFor='firstName' className='text-gray-600 mb-2 block'>
                First Name <span className='text-red-500'>*</span>
              </label>
              <input
                {...register('firstName', {
                  required: 'First Name Field is Required!',
                })}
                type='text'
                name='firstName'
                id='firstName'
                defaultValue={auth?.firstName}
                className={`block w-full px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 ${
                  firstName?.message && 'border-primary border-2'
                }`}
                placeholder='first name'
              />

              {firstName?.message && (
                <p className='text-xs mt-2 ml-1 text-primary'>
                  {firstName.message}
                </p>
              )}
            </div>
            <div className='min-h-[102px] w-full'>
              <label htmlFor='lastName' className='text-gray-600 mb-2 block'>
                Last Name <span className='text-red-500'>*</span>
              </label>
              <input
                {...register('lastName', {
                  required: 'Last Name Field is Required!',
                })}
                type='text'
                name='lastName'
                id='lastName'
                defaultValue={auth?.lastName}
                className={`block w-full px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 ${
                  lastName?.message && 'border-primary border-2'
                }`}
                placeholder='last name'
              />
              {lastName?.message && (
                <p className='text-xs mt-2 ml-1 text-primary'>
                  {lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className='min-h-[102px]'>
            <label htmlFor='email' className='text-gray-600 mb-2 block'>
              Email address <span className='text-red-500'>*</span>
            </label>
            <input
              {...register('email', {
                required: 'Email Field is Required!',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
              type='email'
              name='email'
              id='email'
              defaultValue={auth?.email}
              className={`block w-full px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 ${
                email?.message && 'border-primary border-2'
              }`}
              placeholder='youremail@domain.com'
            />
            {email?.message && (
              <p className='text-xs mt-2 ml-1 text-primary'>{email.message}</p>
            )}
          </div>
          <div className='min-h-[102px] w-full'>
            <label htmlFor='city' className='text-gray-600 mb-2 block'>
              City <span className='text-red-500'>*</span>
            </label>
            <input
              {...register('city', {
                required: 'City Field is Required!',
              })}
              type='text'
              name='city'
              id='city'
              defaultValue={
                operation === 'billing'
                  ? auth?.billingAddress?.city
                  : auth?.shippingAddress?.city
              }
              className={`block w-full px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 ${
                city?.message && 'border-primary border-2'
              }`}
              placeholder='city'
            />
            {city?.message && (
              <p className='text-xs mt-2 ml-1 text-primary'>{city.message}</p>
            )}
          </div>
          <div className='min-h-[102px] w-full'>
            <label htmlFor='postCode' className='text-gray-600 mb-2 block'>
              PostCode <span className='text-red-500'>*</span>
            </label>
            <input
              {...register('postCode', {
                required: 'postCode Field is Required!',
              })}
              type='text'
              name='postCode'
              id='postCode'
              defaultValue={
                operation === 'billing'
                  ? auth?.billingAddress?.postalCode
                  : auth?.shippingAddress?.postalCode
              }
              className={`block w-full px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 ${
                postCode?.message && 'border-primary border-2'
              }`}
              placeholder='postCode'
            />
            {postCode?.message && (
              <p className='text-xs mt-2 ml-1 text-primary'>
                {postCode.message}
              </p>
            )}
          </div>
          <div className='min-h-[102px] w-full'>
            <label htmlFor='phone' className='text-gray-600 mb-2 block'>
              Phone <span className='text-red-500'>*</span>
            </label>
            <input
              {...register('phone', {
                required: 'Phone field is required!',
                minLength: {
                  value: 11,
                  message: 'Phone number must be exactly 11 digits',
                },
                maxLength: {
                  value: 11,
                  message: 'Phone number must be exactly 11 digits',
                },
                pattern: {
                  value: /^(?:\+88|88)?(01[3-9]\d{8})$/,
                  message: 'Phone number not valid',
                },
              })}
              type='text'
              name='phone'
              id='phone'
              defaultValue={auth?.mobile?.number}
              className={`block w-full px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 ${
                errors.phone?.message && 'border-primary border-2'
              }`}
              placeholder='Phone'
            />

            {phone?.message && (
              <p className='text-xs mt-2 ml-1 text-primary'>{phone.message}</p>
            )}
          </div>
          <div className='min-h-[102px] w-full'>
            <label htmlFor='address' className='text-gray-600 mb-2 block'>
              Address <span className='text-red-500'>*</span>
            </label>
            <input
              {...register('address', {
                required: 'address Field is Required!',
              })}
              type='text'
              name='address'
              id='address'
              defaultValue={
                operation === 'billing'
                  ? auth?.billingAddress?.address
                  : auth?.shippingAddress?.address
              }
              className={`block w-full px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 ${
                address?.message && 'border-primary border-2'
              }`}
              placeholder='address'
            />
            {address?.message && (
              <p className='text-xs mt-2 ml-1 text-primary'>
                {address.message}
              </p>
            )}
          </div>
        </div>

        <div className='mt-4'>
          <button
            type='submit'
            className={`block w-full py-2 text-center text-white border rounded  ${
              loading
                ? 'bg-slate-500'
                : 'bg-primary border-primary hover:text-primary hover:bg-transparent'
            }  transition uppercase font-roboto font-medium`}
            disabled={loading}>
            {loading ? <Spinner /> : '  Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountForm;
