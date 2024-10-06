import Header from '@/components/Header';

import Ads from '@/components/Ads';
import TrendingProduct from '@/components/trending/TrendingProduct';

import { auth } from '@/auth';

import NewArrivals from '@/components/product/NewArrivals';
import {
  getNewArrivalsProducts,
  getTrendingProducts,
} from '@/database/queries';
import { getLanguage } from '@/utils/process_json';

export default async function Home({ params: { lang } }) {
  const session = await auth();

  const resNewArrivals = await getNewArrivalsProducts(20);
  const trendingProduct = await getTrendingProducts(5);
  const language = await getLanguage(lang);

  return (
    <>
      <Header language={language} />
      <NewArrivals products={resNewArrivals} language={language} />
      <Ads />
      <TrendingProduct trendingProduct={trendingProduct} language={language} />
    </>
  );
}
