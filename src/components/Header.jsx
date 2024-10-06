import bannerImg from '@/public/banner-bg.jpg';
import deliveryVanIcon from '@/public/icons/delivery-van.svg';
import moneyBackIcon from '@/public/icons/money-back.svg';
import serviceHoursIcon from '@/public/icons/service-hours.svg';
import category1 from '@/public/category/category-1.jpg';
import category2 from '@/public/category/category-2.jpg';
import category3 from '@/public/category/category-3.jpg';
import category4 from '@/public/category/category-4.jpg';
import category5 from '@/public/category/category-5.jpg';
import category6 from '@/public/category/category-6.jpg';

import Image from 'next/image';
import Link from 'next/link';

function Header({ language }) {
  return (
    <>
      <div
        className=' py-36 bg-cover bg-no-repeat bg-center'
        style={{
          backgroundImage: `url(${bannerImg.src})`,
        }}>
        <div className='container'>
          <h1 className='text-6xl text-gray-800 font-medium mb-4 capitalize max-w-lg'>
            {language.header.header_title}
          </h1>
          <p className='max-w-2xl'>{language.header.header_desc}</p>
          <div className='mt-12'>
            <Link
              href='/shop'
              className='bg-primary border border-primary text-white px-8 py-3 font-medium 
                    rounded-md hover:bg-transparent hover:text-primary'>
              {language.header.Shop_Now}
            </Link>
          </div>
        </div>
      </div>

      {/* features */}
      <div className='container py-16'>
        <div className='w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center'>
          <div className='border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5'>
            <Image
              src={deliveryVanIcon}
              alt='Delivery'
              className='w-12 h-12 object-contain'
            />
            <div>
              <h4 className='font-medium capitalize text-lg'>Free Shipping</h4>
              <p className='text-gray-500 text-sm'>Order over $200</p>
            </div>
          </div>
          <div className='border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5'>
            <Image
              src={moneyBackIcon}
              alt='Delivery'
              className='w-12 h-12 object-contain'
            />
            <div>
              <h4 className='font-medium capitalize text-lg'>Money Rturns</h4>
              <p className='text-gray-500 text-sm'>30 days money returs</p>
            </div>
          </div>
          <div className='border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5'>
            <Image
              src={serviceHoursIcon}
              alt='Delivery'
              className='w-12 h-12 object-contain'
            />
            <div>
              <h4 className='font-medium capitalize text-lg'>24/7 Support</h4>
              <p className='text-gray-500 text-sm'>Customer support</p>
            </div>
          </div>
        </div>
      </div>

      {/* categories */}
      <div className='container py-16'>
        <h2 className='text-2xl font-medium text-gray-800 uppercase mb-6'>
          {language.header.shop_by_category}
        </h2>
        <div className='grid grid-cols-3 gap-3'>
          <div className='relative rounded-sm overflow-hidden group'>
            <Image src={category1} alt='category 1' className='w-full' />
            <Link
              href='/shop'
              className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition'>
              Bedroom
            </Link>
          </div>
          <div className='relative rounded-sm overflow-hidden group'>
            <Image src={category2} alt='category 1' className='w-full' />
            <Link
              href='#'
              className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition'>
              Mattrass
            </Link>
          </div>
          <div className='relative rounded-sm overflow-hidden group'>
            <Image src={category3} alt='category 1' className='w-full' />
            <Link
              href='/shop'
              className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition'>
              Outdoor
            </Link>
          </div>
          <div className='relative rounded-sm overflow-hidden group'>
            <Image src={category4} alt='category 1' className='w-full' />
            <Link
              href='/shop'
              className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition'>
              Sofa
            </Link>
          </div>
          <div className='relative rounded-sm overflow-hidden group'>
            <Image src={category5} alt='category 1' className='w-full' />
            <Link
              href='/shop'
              className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition'>
              Living Room
            </Link>
          </div>
          <div className='relative rounded-sm overflow-hidden group'>
            <Image src={category6} alt='category 1' className='w-full' />
            <Link
              href='/shop'
              className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition'>
              Kitchen
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
