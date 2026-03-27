import { Center, Text, Pagination } from '@mantine/core';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

const ITEMS_PER_PAGE = 12;

type sortList = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

function ProductsGridSkeleton() {
  return (
    <>
      <div className='flex justify-end mb-6'>
        <div className='w-40'>
          <ProductCardSkeleton type='input' />
        </div>
      </div>

      <div className='grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {Array.from({ length: 12 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </>
  );
}

export default function AllProductsSection() {
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState<sortList>('price-asc');
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const isSearching = search.trim().length > 0;

  const { data, isLoading, isError } = useProducts(
    isSearching ? 1 : page,
    isSearching ? 100 : ITEMS_PER_PAGE
  );

  const filteredProducts = useMemo(() => {
    const products = data?.data ?? [];

    let result = products;

    if (isSearching) {
      result = products.filter((product) =>
        [product.title, product.description, product.tags.join(' ')]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [data?.data, search, isSearching, sortOption]);

  const totalPages = isSearching
    ? Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
    : data?.meta?.pageCount || 1;

  const paginatedProducts = isSearching
    ? filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
    : filteredProducts;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    document
      .getElementById('products-list')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isError)
    return (
      <Center className='h-[50vh]'>
        <Text c='red' size='lg'>
          Failed to load products.
        </Text>
      </Center>
    );

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

      {isLoading ? (
        <ProductsGridSkeleton />
      ) : (
        <>
          {isSearching && filteredProducts.length === 0 && (
            <Center className='py-20'>
              <Text size='lg'>No products found.</Text>
            </Center>
          )}

          <div className='flex justify-end mb-6'>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as sortList)}
              className='border border-gray-300 rounded px-3 py-1'
            >
              <option value='price-asc'>Price: Low to High</option>
              <option value='price-desc'>Price: High to Low</option>
              <option value='name-asc'>Name: A → Z</option>
              <option value='name-desc'>Name: Z → A</option>
            </select>
          </div>

          <div className='grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className='flex justify-center py-20'>
              <Pagination
                value={page}
                color='black'
                onChange={handlePageChange}
                total={totalPages}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}
