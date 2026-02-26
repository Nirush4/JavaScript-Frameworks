import { Center, Loader, Text, Pagination, Group } from '@mantine/core';
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
    <section id='products-list' className='px-8 pt-20 max-w-350 mx-auto'>
      <div className='mb-16 text-center'>
        <Text
          size='xs'
          tt='uppercase'
          c='dimmed'
          fw={500}
          className='text-base tracking-[0.7em] uppercase text-neutral-500'
        >
          Explore
        </Text>

        <h2 className='text-3xl md:text-5xl font-light mt-0 tracking-[-0.02em] font-serif leading-tight'>
          All Products
        </h2>
      </div>
      <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {data?.meta?.pageCount && data.meta.pageCount > 1 && (
        <Group justify='center' className='py-10'>
          <Pagination
            value={page}
            onChange={handlePageChange}
            total={data.meta.pageCount}
          />
        </Group>
      )}
    </section>
  );
}
