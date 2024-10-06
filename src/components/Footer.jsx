import Link from 'next/link';
import methodImg from '@/public/methods.png';
import Image from 'next/image';
function Footer({ language }) {
  return (
    <>
      <footer className='bg-white pt-16 pb-12 border-t border-gray-100'>
        <div className='container grid grid-cols-1 '>
          <div className='col-span-1 space-y-4'>
            <div>
              <Link href='#' className='text-3xl sm:text-5xl flex'>
                <span className='font-extrabold '>Ecom</span>{' '}
                <span className='font-roboto font-bold text-red-500 '>HUB</span>
              </Link>
            </div>

            <div className='flex space-x-5'>
              <a href='#' className='text-gray-400 hover:text-gray-500'>
                <i className='fa-brands fa-facebook-square'></i>
              </a>
              <a href='#' className='text-gray-400 hover:text-gray-500'>
                <i className='fa-brands fa-instagram-square'></i>
              </a>
              <a href='#' className='text-gray-400 hover:text-gray-500'>
                <i className='fa-brands fa-twitter-square'></i>
              </a>
              <a href='#' className='text-gray-400 hover:text-gray-500'>
                <i className='fa-brands fa-github-square'></i>
              </a>
            </div>
          </div>

          <div className='col-span-2 grid grid-cols-2 gap-4'>
            <div className='grid grid-cols-2 gap-4 md:gap-8'>
              <div>
                <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>
                  {language.footer.sections.solutions.title}
                </h3>
                <div className='mt-4 space-y-4'>
                  <a
                    href='#'
                    className='text-base text-gray-500 hover:text-gray-900 block'>
                    {language.footer.sections.solutions.links.marketing}
                  </a>
                  <a
                    href='#'
                    className='text-base text-gray-500 hover:text-gray-900 block'>
                    {language.footer.sections.solutions.links.analytics}
                  </a>
                  <a
                    href='#'
                    className='text-base text-gray-500 hover:text-gray-900 block'>
                    {language.footer.sections.solutions.links.commerce}
                  </a>
                  <a
                    href='#'
                    className='text-base text-gray-500 hover:text-gray-900 block'>
                    {language.footer.sections.solutions.links.insights}
                  </a>
                </div>
              </div>

              <div>
                <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>
                  {language.footer.sections.support.title}
                </h3>
                <div className='mt-4 space-y-4'>
                  <a
                    href='#'
                    className='text-base text-gray-500 hover:text-gray-900 block'>
                    {language.footer.sections.support.links.pricing}
                  </a>

                  <a
                    href='#'
                    className='text-base text-gray-500 hover:text-gray-900 block'>
                    {language.footer.sections.support.links.guides}
                  </a>
                  <a
                    href='#'
                    className='text-base text-gray-500 hover:text-gray-900 block'>
                    {language.footer.sections.support.links.api_status}
                  </a>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-8'>
              <div>
                <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>
                  {language.footer.sections.solutions.title}
                </h3>
                <div className='mt-4 space-y-4'>
                  <a
                    href='#'
                    className='text-base text-gray-500 hover:text-gray-900 block'>
                    {language.footer.sections.solutions.links.marketing}
                  </a>
                  <a
                    href='#'
                    className='text-base text-gray-500 hover:text-gray-900 block'>
                    {language.footer.sections.solutions.links.analytics}
                  </a>
                  <a
                    href='#'
                    className='text-base text-gray-500 hover:text-gray-900 block'>
                    {language.footer.sections.solutions.links.commerce}
                  </a>
                  <a
                    href='#'
                    className='text-base text-gray-500 hover:text-gray-900 block'>
                    {language.footer.sections.solutions.links.insights}
                  </a>
                </div>
              </div>

              <div>
                <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>
                  {language.footer.sections.support.title}
                </h3>
                <div className='mt-4 space-y-4'>
                  <a
                    href='#'
                    className='text-base text-gray-500 hover:text-gray-900 block'>
                    {language.footer.sections.support.links.pricing}
                  </a>

                  <a
                    href='#'
                    className='text-base text-gray-500 hover:text-gray-900 block'>
                    {language.footer.sections.support.links.guides}
                  </a>
                  <a
                    href='#'
                    className='text-base text-gray-500 hover:text-gray-900 block'>
                    {language.footer.sections.support.links.api_status}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className='bg-gray-800 py-4'>
        <div className='container flex items-center justify-between'>
          <p className='text-white'>&copy; TailCommerce - All Right Reserved</p>
          <div>
            <Image src={methodImg} alt='methods' className='h-5' />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
