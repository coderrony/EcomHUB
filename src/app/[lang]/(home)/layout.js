import '../../globals.css';

import HeadNav from '@/components/nav/HeadNav';
import Navbar from '@/components/nav/Navbar';
import Footer from '@/components/Footer';
import { connectDB } from '@/services/mongo';
import { Toaster } from '@/components/ui/toaster';
import { getLanguage } from '@/utils/process_json';

export default async function HomeLayout({ children, params: { lang } }) {
  await connectDB();

  const language = await getLanguage(lang);

  return (
    <div>
      <HeadNav language={language} />
      <Navbar language={language} />
      {children}
      <Toaster />
      <Footer language={language} />
    </div>
  );
}
