'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [redirected, setRedirected] = useState(false); // Track if redirection has occurred

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleSearch = e => {
    const value = e.target.value;
    setQuery(value);

    // Redirect to /shop if not already there
    if (!pathname.includes('/shop')) {
      setRedirected(true);
      router.push('/shop');
    } else {
      setRedirected(false);
    }
  };

  if (redirected) {
    params.set('query', query);
    // sync to url parameter
    setTimeout(() => {
      router.replace(`${pathname}?${params.toString()}`);
      setRedirected(false);
    }, 100);
  }

  useEffect(() => {
    const getQuery = params.get('query');

    if (getQuery) {
      setQuery(getQuery);
    }
  }, []);

  useEffect(() => {
    if (!redirected) {
      if (query) {
        params.set('query', query);
      } else {
        params.delete('query');
      }

      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [query]);

  return (
    <div className='flex justify-center sm:w-2/3'>
      <input
        type='text'
        name='search'
        id='search'
        value={query} // Bind input value to query state
        onChange={handleSearch}
        className='border border-primary border-r-0 rounded-l-md focus:outline-none sm:flex w-3/5 sm:pl-12 sm:py-3 sm:pr-3'
        placeholder='search'
      />
      <button className='bg-primary border border-primary text-white rounded-r-md hover:bg-transparent hover:text-primary transition sm:flex text-xs sm:text-sm sm:pt-3 px-2 sm:px-6 sm:w-2/7'>
        Search
      </button>
    </div>
  );
}

export default Search;
