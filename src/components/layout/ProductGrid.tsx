import { Center, Loader, Text, Pagination } from '@mantine/core';
import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from './ProductCard';

export default function AllProductsSection() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useProducts(page);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    const section = document.getElementById('products-list');
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (isLoading)
    return (
      <Center className='h-[50vh]'>
        <Loader size='lg' />
      </Center>
    );

  if (isError)
    return (
      <Center className='h-[50vh]'>
        <Text c='red' size='lg'>
          Failed to load products.
        </Text>
      </Center>
    );

  const products = data?.data || [];

  return (
    <section id='products-list' className='px-4 sm:px-8 max-w-338 mx-auto'>
      <div className='mb-7 sm:mb-16 text-center'>
        <p className='text-sm sm:text-base tracking-[0.4em] uppercase text-neutral-500 font-medium'>
          Explore
        </p>

        <h2 className='text-2xl sm:text-4xl md:text-5xl font-light tracking-tight font-serif leading-tight'>
          All Products
        </h2>
      </div>

      <div className='grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {data?.meta?.pageCount && data.meta.pageCount > 1 && (
        <div className='flex justify-center py-12'>
          <Pagination
            value={page}
            color='black'
            onChange={handlePageChange}
            total={data.meta.pageCount}
          />
        </div>
      )}
    </section>
  );
}
