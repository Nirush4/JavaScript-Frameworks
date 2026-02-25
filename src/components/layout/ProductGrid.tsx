import { Center, Loader, Text, Pagination, Group } from '@mantine/core';
import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from './ProductCard';

export default function AllProductsSection() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useProducts(page);

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
    <div className='px-8 pt-20 max-w-350 mx-auto'>
      <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {data?.meta?.pageCount && data.meta.pageCount > 1 && (
        <Group justify='center' className='py-10'>
          <Pagination
            value={page}
            onChange={setPage}
            total={data.meta.pageCount}
          />
        </Group>
      )}
    </div>
  );
}
