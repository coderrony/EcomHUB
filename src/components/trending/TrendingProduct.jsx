import Image from 'next/image';

import ProductCard from '../product/ProductCard';

function TrendingProduct({ trendingProduct, language }) {
  return (
    <div className='container pb-16'>
      <h2 className='text-2xl font-medium text-gray-800 uppercase mb-6'>
        {language.trending_products}
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        {trendingProduct.map(product => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default TrendingProduct;
