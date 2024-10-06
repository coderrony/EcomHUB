'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Image from 'next/image';

import product1Img from '@/public/notFound.jpg';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

import useAuthInfo from '@/hook/useAuthInfo';
import useAddToCart from '@/hook/useAddToCart';
import useToastHook from '@/hook/useToastHook';

function ProductCard({ product }) {
  const showToast = useToastHook();
  const route = useRouter();
  const authInfo = useAuthInfo();
  const { addToCart } = useAddToCart(); //get { cart, addToCart, removeFromCart }

  const handleAddToCart = () => {
    addToCart(
      product?.id,
      product?.productName,
      product?.price,
      product?.thumbNailUrl,
    );
    showToast({
      variant: 'toastSuccess',
      title: 'Add To Cart',
      description: `${product?.productName} Successfully added`,
    });
    if (!authInfo) {
      route.push('/login');
    }
  };

  return (
    <Card className=''>
      <CardHeader className='p-0 overflow-hidden'>
        {' '}
        <Image
          className='max-h-40 pb-1 hover:scale-105  transition'
          src={product?.thumbNailUrl || product1Img} // Fallback image if URL is not provided
          alt={product?.productName || 'Product Image'}
          width={700}
          height={500}
        />
      </CardHeader>
      <CardContent className='p-2'>
        <div className='text-left '>
          <p className='min-h-10 '>
            {' '}
            <Link
              href={`/product/${product?.id}`}
              className='uppercase font-bold text-md  text-gray-800 hover:text-primary transition '>
              {product?.productName}
            </Link>
          </p>
          <div className='flex gap-2 items-center'>
            <p className='text-xl text-primary font-semibold'>
              ${product?.price}
            </p>
            <p className='text-sm text-gray-400 line-through'>
              ${product?.price + 6}
            </p>
          </div>
          <div className='flex justify-between'>
            <p className='text-sm'>Stock: ({product?.stockQuantity}) </p>
            {product?.stockQuantity < 1 && (
              <p className='text-sm text-red-500 pr-6 font-bold'>
                Out Of Stock{' '}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleAddToCart}
          disabled={product?.stockQuantity < 1}
          className='block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition'>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
