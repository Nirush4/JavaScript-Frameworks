import { Container, Center, Loader, Text } from '@mantine/core';
import { useProducts } from '../../hooks/useProducts';
import { Link } from 'react-router-dom';

export default function NewArrivalsSection() {
  const { data, isLoading, isError } = useProducts(1);
  const products = data?.data?.slice(0, 3) || [];

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

  return (
    <section className='bg-[#f6f6f4] py-10 md:py-32'>
      <Container size='xl'>
        <div className='flex justify-between items-end mb-10 md:mb-20'>
          <div>
            <p className='text-base tracking-[0.7em] uppercase text-neutral-500'>
              New Collection
            </p>
            <h2 className='text-4xl md:text-6xl font-light mt-0 tracking-[-0.02em] font-serif leading-tight'>
              New Arrivals
            </h2>
          </div>

          <Link
            to='/products'
            className='text-sm md:text-base tracking-wide border-b  pb-1 hover:opacity-60 transition'
          >
            View All
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-8'>
          <div className='md:col-span-7 group cursor-pointer'>
            <div className='overflow-hidden'>
              <img
                src={products[0].image.url}
                alt={products[0].image.alt}
                className='w-full h-175 object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out'
              />
            </div>

            <div className='mt-6'>
              <h3 className='text-xl font-light'>{products[0].title}</h3>
              <p className='mt-2 text-black font-bold'>${products[0].price}</p>
            </div>
          </div>

          <div className='md:col-span-5 grid gap-8'>
            {products.slice(1).map((product) => (
              <div key={product.id} className='group cursor-pointer'>
                <div className='overflow-hidden'>
                  <img
                    src={product.image.url}
                    alt={product.image.alt}
                    className='w-full h-80 object-cover transition-transform duration-700 group-hover:scale-[1.03]'
                  />
                </div>

                <div className='mt-4'>
                  <h4 className='text-sm font-light'>{product.title}</h4>
                  <p className='text-sm text-black font-bold mt-1'>
                    ${product.price}
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
