'use client';

import { useEffect, useState, useMemo } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function FilterForm({ categorys }) {
  const [query, setQuery] = useState([]);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Memoize params to avoid recreating it on each render
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const handleFilter = e => {
    const name = e.target.name;
    const checked = e.target.checked;
    if (checked) {
      setQuery(prev => [...prev, name]);
    } else {
      setQuery(query.filter(item => item !== name));
    }
  };

  const handlePriceChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'min') {
      setMinValue(value);
    }
    if (name === 'max') {
      setMaxValue(value);
    }
  };

  // Populate initial state from query parameters
  useEffect(() => {
    const category = params.get('category');
    const maxV = params.get('max');
    const minV = params.get('min');

    if (category) {
      const decodeCategory = decodeURI(category);
      setQuery(decodeCategory.split('|'));
    }

    if (maxV) {
      setMaxValue(maxV);
    }
    if (minV) {
      setMinValue(minV);
    }
  }, [params]);

  // Update URL search params when query, minValue, or maxValue changes
  useEffect(() => {
    if (query.length > 0) {
      params.set('category', encodeURI(query.join('|')));
    } else {
      params.delete('category');
    }

    if (
      Number(maxValue) &&
      Number(minValue) &&
      Number(maxValue) > Number(minValue)
    ) {
      params.set('min', minValue);
      params.set('max', maxValue);
    } else if (Number(minValue) && !Number(maxValue)) {
      params.set('min', minValue);
    } else if (Number(maxValue) && !Number(minValue)) {
      params.set('max', maxValue);
    } else {
      params.delete('min');
      params.delete('max');
    }

    if (!minValue) {
      params.delete('min');
    }
    if (!maxValue) {
      params.delete('max');
    }

    replace(`${pathname}?${params.toString()}`);
  }, [query, minValue, maxValue, pathname, replace, params]);

  return (
    <>
      <div className='divide-gray-200 space-y-5'>
        <ScrollArea className='h-44 rounded-md border'>
          <div className='p-4'>
            {categorys.map(category => (
              <div className='flex items-center my-2' key={category}>
                <input
                  onChange={handleFilter}
                  type='checkbox'
                  name={category}
                  checked={query.includes(category)}
                  className='text-primary focus:ring-0 rounded-sm cursor-pointer'
                />
                <label
                  htmlFor='cat-1'
                  className='text-gray-600 ml-3 cursor-pointer'>
                  {category}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className='pt-4'>
          <h3 className='text-xl text-gray-800 mb-3 uppercase font-medium'>
            Price
          </h3>
          {maxValue && minValue && Number(maxValue) < Number(minValue) && (
            <p className='text-xs text-red-400'>
              Max value must be greater than min value
            </p>
          )}
          <div className='mt-4 flex items-center justify-center'>
            <div className='h-5'>
              <input
                onChange={handlePriceChange}
                type='number'
                name='min'
                value={minValue !== null && minValue}
                id='min'
                className='w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm'
                placeholder='min'
              />
            </div>

            <p className='mx-3 text-gray-500 h-5'>-</p>
            <div className='h-5'>
              <input
                onChange={handlePriceChange}
                value={maxValue !== null && maxValue}
                type='number'
                name='max'
                id='max'
                className='w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm'
                placeholder='max'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterForm;
