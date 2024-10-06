'use client';

import useToastHook from '@/hook/useToastHook';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from '../common/Spinner';

function ConfirmRestPassword({ user, setForgetOtpVerify }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },

    watch,
  } = useForm();

  const showToast = useToastHook();

  const { password, confirm } = errors;
  const passwordValue = watch('password');

  const handleResetPassword = async data => {
    setLoading(true);

    try {
      // otp send
      const res = await fetch(`/api/auth/forget-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: data?.password,
          email: user?.email,
        }),
      });

      const responseData = await res.json();
      if (responseData?.status === 200) {
        showToast({
          variant: 'toastSuccess',
          title: 'Reset Password',
          description: responseData?.message,
        });
        setForgetOtpVerify(false);
      }
    } catch (err) {
      console.log(err);
      showToast({
        variant: 'destructive',
        title: 'Try Later',
        description: 'An unexpected error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleResetPassword)}>
      <h2 className='text-2xl uppercase font-medium mb-1'>Reset Password</h2>
      <div className='min-h-[102px]'>
        <label htmlFor='password' className='text-gray-600 mb-2 block'>
          Password
        </label>
        <input
          {...register('password', {
            required: 'Password Field is Required!',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          type='password'
          name='password'
          id='password'
          className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${
            password?.message && 'border-primary border-2'
          }`}
          placeholder='*******'
        />
        {password?.message && (
          <p className='text-xs mt-2 ml-1 text-primary'>{password.message}</p>
        )}
      </div>
      <div className='min-h-[102px]'>
        <label htmlFor='confirm' className='text-gray-600 mb-2 block'>
          Confirm password
        </label>
        <input
          {...register('confirm', {
            required: 'Confirm Password Field is Required!',
            validate: value =>
              value === passwordValue || 'Passwords do not match',
          })}
          type='password'
          name='confirm'
          id='confirm'
          className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${
            confirm?.message && 'border-primary border-2'
          }`}
          placeholder='*******'
        />
        {confirm?.message && (
          <p className='text-xs mt-2 ml-1 text-primary'>{confirm.message}</p>
        )}
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
          {loading ? <Spinner /> : 'Reset'}
        </button>
      </div>
    </form>
  );
}

export default ConfirmRestPassword;
