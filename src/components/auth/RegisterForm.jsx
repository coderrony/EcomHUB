'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import useToastHook from '@/hook/useToastHook';
import Spinner from '../common/Spinner';
import OtpModal from './OtpModal';

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [user, setUser] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const showToast = useToastHook();

  const { firstName, lastName, email, password, confirm } = errors;
  const passwordValue = watch('password');

  const registerHandle = async event => {
    setLoading(true);
    const { confirm, ...data } = event;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data?.email }),
      });
      const responseData = await res.json();
      if (responseData.status === 201) {
        setUser(data);
        setOtpModal(true);
      }
      if (responseData.status === 409) {
        setError('email', { message: 'Please use a different email' });
        showToast({
          variant: 'destructive',
          title: 'Email Already Exists',
          description: responseData?.message,
        });
      }
      if (responseData.status === 404) {
        showToast({
          variant: 'destructive',
          title: 'unvalidated identifications',
          description: responseData?.message,
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);

      showToast({
        variant: 'destructive',
        title: 'Something is Wrong!',
        description: err?.message,
      });
    }
    setLoading(false);
  };

  return (
    <div>
      {otpModal ? (
        <OtpModal
          setOtpModal={setOtpModal}
          otpModal={otpModal}
          user={user}
          forgetPassword={false}
        />
      ) : (
        <form onSubmit={handleSubmit(registerHandle)}>
          <div className=''>
            <div className='min-h-[102px]'>
              <label htmlFor='firstName' className='text-gray-600 mb-2 block'>
                First Name
              </label>
              <input
                {...register('firstName', {
                  required: 'First Name Field is Required!',
                })}
                type='text'
                name='firstName'
                id='firstName'
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
            <div className='min-h-[102px]'>
              <label htmlFor='lastName' className='text-gray-600 mb-2 block'>
                Last Name
              </label>
              <input
                {...register('lastName', {
                  required: 'Last Name Field is Required!',
                })}
                type='text'
                name='lastName'
                id='lastName'
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
            <div className='min-h-[102px]'>
              <label htmlFor='email' className='text-gray-600 mb-2 block'>
                Email address
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
                className={`block w-full px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 ${
                  email?.message && 'border-primary border-2'
                }`}
                placeholder='youremail@domain.com'
              />
              {email?.message && (
                <p className='text-xs mt-2 ml-1 text-primary'>
                  {email.message}
                </p>
              )}
            </div>
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
                <p className='text-xs mt-2 ml-1 text-primary'>
                  {password.message}
                </p>
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
                <p className='text-xs mt-2 ml-1 text-primary'>
                  {confirm.message}
                </p>
              )}
            </div>
          </div>
          <div className='mt-6'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                name='aggrement'
                id='aggrement'
                className='text-primary focus:ring-0 rounded-sm cursor-pointer'
              />
              <label
                htmlFor='aggrement'
                className='text-gray-600 ml-3 cursor-pointer'>
                I have read and agree to the{' '}
                <a href='#' className='text-primary'>
                  terms & conditions
                </a>
              </label>
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
              {loading ? <Spinner /> : '   create account'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default RegisterForm;
