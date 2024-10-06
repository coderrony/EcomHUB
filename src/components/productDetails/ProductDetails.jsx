'use client';
import Image from 'next/image';

import { Heart, ShoppingBasket } from 'lucide-react';
import { Button } from '../ui/button';

import useAuthInfo from '@/hook/useAuthInfo';
import { useRouter } from 'next/navigation';
import useAddToCart from '@/hook/useAddToCart';

import useAddToWishList from '@/hook/useAddToWish';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

function ProductDetails({ product }) {
  const route = useRouter();

  const { addToCart } = useAddToCart(); //get { cart, addToCart, removeFromCart }
  const { addToWishList } = useAddToWishList(); //get { wishList, addToWishList, removeFromWishList}
  const authInfo = useAuthInfo();

  const handleAddToCart = () => {
    addToCart(
      product?.id,
      product?.productName,
      product?.price,
      product?.thumbNailUrl,
    );

    if (!authInfo) {
      route.push('/login');
    }
  };

  const handleAddToWishList = () => {
    //addToWishList received id, productName, price, image, stockQuantity
    addToWishList(
      product?.id,
      product?.productName,
      product?.price,
      product?.thumbNailUrl,
      product?.stockQuantity,
    );

    if (!authInfo) {
      route.push('/login');
    }
  };

  return (
    <div className='container mt-5'>
      <div className=' grid md:grid-cols-2 gap-6'>
        <div>
          <Image
            src={product?.thumbNailUrl}
            alt={product?.productName}
            width={600}
            height={500}
          />

          <div className='grid grid-cols-5 gap-4 mt-4'>
            {product?.gallery.map((img, index) => (
              <Image
                key={img}
                src={img}
                width={10}
                height={10}
                alt={`product image ${index}`}
                className='w-full cursor-pointer border border-primary'
              />
            ))}
          </div>
        </div>

        <div>
          <div className='flex gap-4 items-center justify-between'>
            <h2 className='text-3xl font-medium uppercase mb-2'>
              {product?.productName}
            </h2>

            <div className='flex items-center justify-center gap-2'>
              <h2 className='font-medium'>Share</h2>
              <FacebookShareButton
                url={`${process.env.NEXT_PUBLIC_API_BASE_URL}/en/product/${product?.id}`}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <TwitterShareButton
                url={`${process.env.NEXT_PUBLIC_API_BASE_URL}/en/product/${product?.id}`}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
            </div>
          </div>

          <div className='space-y-2'>
            <p className='text-gray-800 font-semibold space-x-2'>
              <span>Availability: </span>
              {product?.stockQuantity > 0 ? (
                <span className='text-green-600'>In Stock</span>
              ) : (
                <span className='text-zinc-400-600'> Stock Out</span>
              )}
            </p>
            <p className='space-x-2'>
              <span className='text-gray-800 font-semibold'>Brand: </span>
              <span className='text-gray-600'>{product?.brand}</span>
            </p>
            <p className='space-x-2'>
              <span className='text-gray-800 font-semibold'>Category: </span>
              <span className='text-gray-600'>{product?.category}</span>
            </p>
            <p className='space-x-2'>
              <span className='text-gray-800 font-semibold'>SKU: </span>
              <span className='text-gray-600'>{product?.id?.slice(-10)}</span>
            </p>
          </div>
          <div className='flex items-baseline mb-1 space-x-2 font-roboto mt-4'>
            <p className='text-xl text-primary font-semibold'>
              ${product?.price}
            </p>
            <p className='text-base text-gray-400 line-through'>
              ${product?.price + 6}
            </p>
          </div>

          <p className='mt-4 text-gray-600'>{product?.description}</p>

          <div className='mt-4'>
            <h3 className='text-sm text-gray-800 uppercase mb-1 font-bold'>
              Quantity :{' '}
              <span className='text-primary'>{product?.stockQuantity}</span>
            </h3>
            {product?.stockQuantity < 1 && (
              <p className='text-sm text-red-500 pr-6 font-bold'>
                Out Of Stock{' '}
              </p>
            )}
          </div>

          <div className='mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5'>
            <Button
              onClick={handleAddToCart}
              disabled={product?.stockQuantity < 1}
              className='bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition'>
              <ShoppingBasket size={20} /> Add to cart
            </Button>
            <Button
              onClick={handleAddToWishList}
              className='border border-primary bg-white text-primary px-8 hover:text-white py-2 font-medium rounded uppercase flex items-center gap-2  transition'>
              <Heart size={20} /> Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
