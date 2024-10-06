import ProductCarousel from '@/components/product/ProductCarousel';
import ProductDetails from '@/components/productDetails/ProductDetails';
import { getProductAndRelatedProduct } from '@/database/queries';

async function ProductDetailsPage({ params: { id } }) {
  const product = await getProductAndRelatedProduct(id);

  const removeDuplicateProduct = product?.relatedProducts?.filter(
    item => item?.id !== product?.singleProduct?.id,
  );

  return (
    <div>
      <ProductDetails product={product?.singleProduct} />
      {removeDuplicateProduct.length > 0 && (
        <div className='container pt-8 pb-4'>
          <h2 className='text-2xl font-medium text-gray-800 uppercase mb-6'>
            Related products
          </h2>

          <ProductCarousel products={removeDuplicateProduct} />
        </div>
      )}
    </div>
  );
}

export default ProductDetailsPage;
