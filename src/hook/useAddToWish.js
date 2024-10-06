'use client';

import { WishlistContext } from '@/context';
import { useContext } from 'react';

const useAddToWishList = () => {
  return useContext(WishlistContext); //return {wishList, addToWishList, removeFromWishList }
};

export default useAddToWishList;
