import { Center, Container, Loader, Text } from '@mantine/core';
import { useProducts } from '../../hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import type { JSX } from 'react';

export default function BestSellersSection(): JSX.Element {
  const { data, isLoading, isError } = useProducts(1);
  const navigate = useNavigate();

  const allProducts = data?.data || [];

  const bestSellers = allProducts
    .filter((p) => p.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  if (isLoading)
    return (
      <section className='py-32 bg-[#f6f6f4]'>
        <Center>
          <Loader />
        </Center>
      </section>
    );

  if (isError)
    return (
      <section className='py-32 bg-[#f6f6f4]'>
        <Center>
          <Text c='red'>Failed to load best sellers.</Text>
        </Center>
      </section>
    );

  return (
    <section className='py-24 bg-white'>
      <Container size='xl'>
        <div className='mb-16 text-center'>
          <p className='text-sm sm:text-base tracking-[0.4em] uppercase text-neutral-500 font-medium'>
            Popular Now
          </p>
          <h2 className='text-2xl md:text-5xl font-light mt-0 tracking-[-0.02em] font-serif leading-tight'>
            Best Sellers
          </h2>
        </div>

        <div className='grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className='group relative cursor-pointer'
              onClick={() => navigate(`/products/${product.id}`)}
              role='button'
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`/products/${product.id}`);
                }
              }}
              aria-label={`View details for ${product.title}`}
            >
              <span className='absolute top-2 left-2 bg-black text-white text-xs uppercase px-2 py-1 font-semibold tracking-wide z-10'>
                Best Seller
              </span>

              <div className='overflow-hidden'>
                <img
                  src={product.image.url}
                  alt={product.image.alt || product.title}
                  className='w-full h-40 sm:h-90 object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out'
                />
              </div>

              <div className='mt-4 text-center'>
                <h2 className='text-base text-black '>{product.title}</h2>
                <p className='text-sm sm:text-base text-black mt-1 font-bold'>
                  {Number(product.price).toLocaleString('nb-NO', {
                    style: 'currency',
                    currency: 'NOK',
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
