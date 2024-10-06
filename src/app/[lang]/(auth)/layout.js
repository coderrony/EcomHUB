import { Inter, Roboto, Poppins } from 'next/font/google';
import '../../globals.css';
import Navbar from '@/components/nav/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { getLanguage } from '@/utils/process_json';

export const metadata = {
  title: 'Auth',
};

export default async function AuthLayout({ children, params: { lang } }) {
  const language = await getLanguage(lang);
  return (
    <div>
      <Navbar language={language} />
      {children}
      <Toaster />
    </div>
  );
}
