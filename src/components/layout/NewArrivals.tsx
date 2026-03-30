import { Container, Center, Loader, Text } from '@mantine/core';
import { useProducts } from '../../hooks/useProducts';
import { useNavigate, Link } from 'react-router-dom';
import type { JSX } from 'react';

export default function NewArrivalsSection(): JSX.Element | null {
  const { data, isLoading, isError } = useProducts(1);
  const products = data?.data?.slice(0, 3) || [];
  const navigate = useNavigate();

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
          <Text c='red'>Failed to load products.</Text>
        </Center>
      </section>
    );

  if (!products.length) return null;

  const handleNavigate = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <section className='bg-[#f6f6f4] py-10 md:py-32'>
      <Container size='xl'>
        <div className='flex justify-between items-end mb-10 md:mb-20'>
          <div>
            <p className='text-sm sm:text-base tracking-[0.4em] uppercase text-neutral-500 font-medium'>
              New Collection
            </p>
            <h2 className='text-2xl md:text-5xl font-light mt-0 tracking-[-0.02em] font-serif leading-tight'>
              New Arrivals
            </h2>
          </div>

          <Link
            to='/products'
            className='text-sm md:text-base tracking-wide border-b pb-1 hover:opacity-60 transition'
          >
            View All
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8'>
          <div
            className='md:col-span-7 group cursor-pointer'
            role='button'
            tabIndex={0}
            aria-label={`View details for ${products[0].title}`}
            onClick={() => handleNavigate(products[0].id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleNavigate(products[0].id);
              }
            }}
          >
            <div className='overflow-hidden'>
              <img
                src={products[0].image.url}
                alt={products[0].image.alt || products[0].title}
                className='w-full h-60 sm:h-64 md:h-175 object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out'
              />
            </div>

            <div className='mt-4 sm:mt-6'>
              <h3 className='text-sm sm:text-xl md:text-2xl font-light line-clamp-2'>
                {products[0].title}
              </h3>
              <p className='mt-2 text-black font-bold text-sm sm:text-lg'>
                {products[0].price.toLocaleString('nb-NO', {
                  style: 'currency',
                  currency: 'NOK',
                  minimumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>

          <div className='md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6'>
            {products.slice(1).map((product) => (
              <div
                key={product.id}
                className='group cursor-pointer'
                role='button'
                tabIndex={0}
                aria-label={`View details for ${product.title}`}
                onClick={() => handleNavigate(product.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleNavigate(product.id);
                  }
                }}
              >
                <div className='overflow-hidden'>
                  <img
                    src={product.image.url}
                    alt={product.image.alt || product.title}
                    className='w-full h-60 sm:h-64 md:h-73 object-cover transition-transform duration-700 group-hover:scale-[1.03]'
                  />
                </div>

                <div className='mt-2 sm:mt-4'>
                  <h4 className='text-sm sm:text-base font-light line-clamp-2'>
                    {product.title}
                  </h4>
                  <p className='text-sm sm:text-base text-black font-bold mt-1'>
                    {product.price.toLocaleString('nb-NO', {
                      style: 'currency',
                      currency: 'NOK',
                      minimumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
