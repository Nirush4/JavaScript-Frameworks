import { Center, Container, Loader, Text } from '@mantine/core';
import { useProducts } from '../../hooks/useProducts';

export default function BestSellersSection() {
  const { data, isLoading, isError } = useProducts(1);
  const allProducts = data?.data || [];

  const bestSellers = allProducts.filter((p) => p.rating >= 4.5).slice(0, 4);

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
          <Text
            size='xs'
            tt='uppercase'
            c='dimmed'
            fw={500}
            className='text-base tracking-[0.7em] uppercase text-neutral-500'
          >
            Popular Now
          </Text>

          <h2 className='text-3xl md:text-5xl font-light mt-0 tracking-[-0.02em] font-serif leading-tight'>
            Best Sellers
          </h2>
        </div>

        <div className='grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {bestSellers.map((product) => (
            <div key={product.id} className='group relative cursor-pointer'>
              <span className='absolute top-2 left-2 bg-black text-white text-xs uppercase px-2 py-1 font-semibold tracking-wide z-10'>
                Best Seller
              </span>

              <div className='overflow-hidden'>
                <img
                  src={product.image.url}
                  alt={product.image.alt}
                  className='w-full h-87.5 object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out'
                />
              </div>

              <div className='mt-4 text-center'>
                <p className='text-sm font-light'>{product.title}</p>
                <p className='text-sm text-gray-500 mt-1'>${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
