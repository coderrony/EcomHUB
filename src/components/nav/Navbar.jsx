'use client';

import Image from 'next/image';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import sofaIcon from '@/public/icons/sofa.svg';
import terraceIcon from '@/public/icons/terrace.svg';
import bedIcon from '@/public/icons/bed.svg';
import officeIcon from '@/public/icons/office.svg';
import outdoorCafeIcon from '@/public/icons/outdoor-cafe.svg';
import bed2Icon from '@/public/icons/bed-2.svg';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

import useAuthInfo from '@/hook/useAuthInfo';

function Navbar({ language }) {
  const pathName = usePathname();

  const authInfo = useAuthInfo();

  return (
    <nav className='bg-gray-800'>
      <div className='container flex '>
        {pathName.includes('/login') || pathName.includes('/register') ? (
          <div className='text-white flex items-center mr-4 '>
            <Link href={`/${language.lang}`} className='sm:text-xl flex'>
              <span className='font-extrabold '>Ecom</span>{' '}
              <span className='font-roboto font-bold text-red-500 '>HUB</span>
            </Link>
          </div>
        ) : (
          <div className='py-5 px-4 md:px-8 mx-4 md:py-4 bg-primary md:flex items-center cursor-pointer relative group '>
            <span className='text-white '>
              <HamburgerMenuIcon width={23} height={23} className='mx-auto' />
            </span>
            <span className='capitalize ml-2 text-white hidden md:block'>
              {language.navbar.All_Categories}
            </span>

            {/* dropdown */}
            <div
              className='absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px] z-10'
              style={{ width: '300px' }}>
              <a
                href='#'
                className='flex items-center px-6 py-3 hover:bg-gray-100 transition'>
                <Image
                  src={sofaIcon}
                  width={50}
                  height={50}
                  alt='sofa'
                  className='w-5 h-5 object-contain'
                />
                <span className='ml-6 text-gray-600 text-sm'>Sofa</span>
              </a>
              <Link
                href='/shop'
                className='flex items-center px-6 py-3 hover:bg-gray-100 transition'>
                <Image
                  src={terraceIcon}
                  width={50}
                  height={50}
                  alt='terrace'
                  className='w-5 h-5 object-contain'
                />
                <span className='ml-6 text-gray-600 text-sm'>Living Room</span>
              </Link>
              <Link
                href='/shop'
                className='flex items-center px-6 py-3 hover:bg-gray-100 transition'>
                <Image
                  src={bedIcon}
                  width={50}
                  height={50}
                  alt='bed'
                  className='w-5 h-5 object-contain'
                />
                <span className='ml-6 text-gray-600 text-sm'>Bedroom</span>
              </Link>
              <Link
                href='/shop'
                className='flex items-center px-6 py-3 hover:bg-gray-100 transition'>
                <Image
                  src={officeIcon}
                  width={50}
                  height={50}
                  alt='Outdoor'
                  className='w-5 h-5 object-contain'
                />
                <span className='ml-6 text-gray-600 text-sm'>Outdoor</span>
              </Link>
              <Link
                href='/shop'
                className='flex items-center px-6 py-3 hover:bg-gray-100 transition'>
                <Image
                  src={outdoorCafeIcon}
                  width={50}
                  height={50}
                  alt='outdoor'
                  className='w-5 h-5 object-contain'
                />
                <span className='ml-6 text-gray-600 text-sm'>Outdoor</span>
              </Link>
              <Link
                href='/shop'
                className='flex items-center px-6 py-3 hover:bg-gray-100 transition'>
                <Image
                  src={bed2Icon}
                  width={50}
                  height={50}
                  alt='Mattress'
                  className='w-5 h-5 object-contain'
                />
                <span className='ml-6 text-gray-600 text-sm'>Mattress</span>
              </Link>
            </div>
          </div>
        )}

        <div className='flex items-center justify-between flex-grow md:pl-12 py-5'>
          <div className='flex items-center text-[0.55rem] sm:text-xs md:text-base space-x-2 md:space-x-6 capitalize'>
            <Link
              href={`/${language.lang}`}
              className='text-gray-200 hover:text-white transition '>
              {language.navbar.Home}
            </Link>
            <Link
              href={`/${language.lang}/shop`}
              className='text-gray-200 hover:text-white transition'>
              {language.navbar.Shop}
            </Link>
            <Link
              href='#'
              className='text-gray-200 hover:text-white transition'>
              {language.navbar.About_us}
            </Link>
            <Link
              href='#'
              className='text-gray-200 hover:text-white transition'>
              {language.navbar.Contact_us}
            </Link>
          </div>

          {authInfo ? (
            <button
              onClick={() =>
                signOut({ callbackUrl: 'http://localhost:3000/login' })
              }
              className='text-gray-200 hover:text-white transition text-xs md:text-base'>
              {language.navbar.Logout}
            </button>
          ) : pathName?.includes('/login') ? (
            <Link
              href={`/${language.lang}/register`}
              className='text-gray-200 hover:text-white transition text-xs md:text-base'>
              {language.navbar.Register}
            </Link>
          ) : (
            <Link
              href={`/${language.lang}/login`}
              className='text-gray-200 hover:text-white transition text-xs md:text-base'>
              {language.navbar.Login}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
