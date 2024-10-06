import ProductCarousel from './ProductCarousel';

function NewArrivals({ products, language }) {
  return (
    <div className=' container py-16'>
      <h2 className='text-2xl font-medium text-gray-800 uppercase mb-6 ml-3'>
 
        {language.new_arrival}
      </h2>
      <ProductCarousel products={products} />
    </div>
  );
}

export default NewArrivals;
