import ProductList from '@/components/product/ProductList';
import FilterProduct from '@/components/shop/FilterProduct';

import { getDistinctCategories } from '@/database/queries';

async function ShopPage({ searchParams }) {
  const categorys = await getDistinctCategories();

  return (
    <div className='container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start'>
      <FilterProduct categorys={categorys} />

      {/* products */}
      <div className='col-span-3 h-screen overflow-auto'>
        <div className='grid md:grid-cols-3 grid-cols-2 gap-6  '>
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
