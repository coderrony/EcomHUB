'use client';
import { WishlistContext } from '@/context';
import useToastHook from '@/hook/useToastHook';
import { useEffect, useState } from 'react';

function WishlistProvider({ children }) {
  const showToast = useToastHook();
  const [wishList, setWishList] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedWishlist = localStorage.getItem('wishlist');
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    }
    return [];
  });

  useEffect(() => {
    if (wishList.length === 0) {
      localStorage.setItem('wishlist', JSON.stringify([]));
    } else {
      localStorage.setItem('wishlist', JSON.stringify(wishList));
    }
  }, [wishList]);

  const addToWishList = (id, productName, price, image, stockQuantity) => {
    const isExists = wishList.some(item => item.id === id);

    if (isExists) {
      showToast({
        variant: 'toastDanger',
        title: 'Already Exist',
        description: `${productName} are already exist`,
      });
    } else {
      setWishList(prev => [
        ...prev,
        {
          id,
          productName,
          price,
          stockQuantity,
          image,
        },
      ]);
      showToast({
        variant: 'toastSuccess',
        title: 'Add To Wish List',
        description: `${productName} added`,
      });
    }
  };

  const removeFromWishList = (productId, productName) => {
    const deleteCart = wishList.filter(item => item.id !== productId);

    showToast({
      variant: 'toastSuccess',
      title: 'remove from wish list',
      description: `${productName} removed`,
    });

    setWishList(deleteCart);
  };

  return (
    <WishlistContext.Provider
      value={{ wishList, addToWishList, removeFromWishList }}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
