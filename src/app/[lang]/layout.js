import CartProvider from '@/provider/CartProvider';
import '../globals.css';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider
import { Roboto, Poppins } from 'next/font/google';
import WishlistProvider from '@/provider/WishlistProvider';
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata = {
  title: {
    default: 'EcomHUB',
    template: '%s - EcomHUB',
  },

  description:
    'EcomHUB is your one-stop shop for the latest products in electronics, fashion, and more. Enjoy exclusive deals, fast shipping, and a seamless shopping experience.',
  keywords:
    'ecommerce, online shopping, electronics, fashion, deals, fast shipping, EcomHUB',
  author: 'EcomHUB Team',
  robots: 'index, follow',
  openGraph: {
    title: 'EcomHUB - Shop the Best Deals Online',
    description:
      'Discover the newest products at unbeatable prices on EcomHUB. Shop electronics, fashion, and more with fast shipping and secure payments.',
    url: 'https://www.ecomhub.com',

    site_name: 'EcomHUB',
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${roboto.variable} ${poppins.variable}`}>
        <SessionProvider>
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
