'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import useAddToCart from '@/hook/useAddToCart';
import useAddToWishList from '@/hook/useAddToWish';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function WishListPage() {
  const [myWishList, setMyWishList] = useState([]);
  const { addToCart } = useAddToCart(); //get { cart, addToCart, removeFromCart }
  const { wishList, removeFromWishList } = useAddToWishList(); //get { wishList, addToWishList, removeFromWishList}


  useEffect(() => {
    setMyWishList(wishList);
  }, [wishList]);

  const handleAddToCart = product => {
    addToCart(
      product?.id,
      product?.productName,
      product?.price,
      product?.image,
    );
  };
  return (
    <div className='h-[300px] md:h-[500px] overflow-auto'>
      <div className='mx-auto space-y-4 max-w-6xl'>
        <ScrollArea>
          {myWishList.map(item => (
            <div
              key={item?.id}
              className='flex items-center justify-between border gap-6 p-4 border-gray-200 rounded m-2'>
              <div className='w-28'>
                <Image
                  width={100}
                  height={100}
                  src={item?.image}
                  alt='product 6'
                  className='w-full'
                />
              </div>
              <div className='w-1/3'>
                <h2 className='text-gray-800 text-xl font-medium uppercase'>
                  {item?.productName}
                </h2>
                <p className='text-gray-500 text-sm'>
                  Availability:{' '}
                  {item?.stockQuantity > 0 ? (
                    <span className='text-green-600'>In Stock</span>
                  ) : (
                    <span className='text-red-600'> Out of Stock </span>
                  )}
                </p>
              </div>
              <div className='text-primary text-lg font-semibold'>
                ${parseFloat(item?.price.toFixed(2))}
              </div>

              <div className='flex justify-between items-center  gap-2'>
                <button
                  onClick={() => handleAddToCart(item)}
                  className='px-3 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium'>
                  add to cart
                </button>
                <button
                  onClick={() =>
                    removeFromWishList(item?.id, item?.productName)
                  }
                  className='px-3 py-2 text-center text-sm text-primary bg-white border border-primary rounded hover:bg-transparent hover:bg-primary hover:text-white transition uppercase font-roboto font-medium'>
                  Remove From Wishlist
                </button>
              </div>

              <div className='text-gray-600 cursor-pointer hover:text-primary'>
                <i className='fa-solid fa-trash'></i>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}

export default WishListPage;
