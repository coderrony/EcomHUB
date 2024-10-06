'use client';
import { HeartIcon, CardStackIcon, AvatarIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Search from './Search';
import useAuthInfo from '@/hook/useAuthInfo';
import useAddToCart from '@/hook/useAddToCart';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAddToWishList from '@/hook/useAddToWish';
import LanguageSwitcher from './LanguageSwitcher';

function HeadNav({ language }) {
  const { cart } = useAddToCart();
  const { wishList } = useAddToWishList(); //get { wishList, addToWishList, removeFromWishList}
  const [myCart, setMyCart] = useState(0);
  const [myWishList, setMyWishList] = useState(0);
  const authInfo = useAuthInfo();
  const route = useRouter();

  useEffect(() => {
    setMyCart(cart?.length);
  }, [cart]);

  useEffect(() => {
    setMyWishList(wishList?.length);
  }, [wishList]);

  const handleCart = () => {
    if (!authInfo) {
      route.push(`/${language.lang}/login`);
    } else {
      route.push(`/${language.lang}/cart`);
    }
  };

  const handleWishList = () => {
    if (!authInfo) {
      route.push(`/${language.lang}/login`);
    } else {
      route.push(`/${language.lang}/wishlist`);
    }
  };

  return (
    <header className='py-4 shadow-sm bg-white'>
      <div className='container flex items-center '>
        {/* logo */}
        <div>
          <Link href={`/${language.lang}`} className='sm:text-xl flex'>
            <span className='font-extrabold '>Ecom</span>{' '}
            <span className='font-roboto font-bold text-red-500 '>HUB</span>
          </Link>
        </div>

        <Search />
        {/* items  */}

        <div className='flex space-x-3 ml-auto'>
          <button
            onClick={handleWishList}
            className='text-center text-gray-700 hover:text-primary transition relative'>
            <HeartIcon width={23} height={23} className='mx-auto' />

            <div className='text-xs leading-3'>
              {language.navHeader.Wishlist}
            </div>
            <div className='absolute right-0 -top-1 w-4 h-4 rounded-full flex items-center justify-center bg-primary text-white text-xs'>
              {myWishList}
            </div>
          </button>
          <button
            onClick={handleCart}
            className='text-center text-gray-700 hover:text-primary transition relative'>
            <CardStackIcon width={23} height={23} className='mx-auto' />

            <div className='text-xs leading-3'> {language.navHeader.Cart} </div>
            <div className='absolute -right-1 -top-1 w-4 h-4 rounded-full flex items-center justify-center bg-primary text-white text-xs'>
              {myCart}
            </div>
          </button>
          {authInfo && (
            <button
              onClick={() => route.push(`/${language.lang}/account`)}
              className='text-center text-gray-700 hover:text-primary transition  '>
              <AvatarIcon width={23} height={23} className='mx-auto' />
              <div className='text-xs leading-3'>
                {' '}
                {language.navHeader.Account}{' '}
              </div>
            </button>
          )}

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

export default HeadNav;
