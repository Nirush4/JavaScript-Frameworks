import { Container } from '@mantine/core';

export default function AboutPage() {
  return (
    <div className='bg-gray-50'>
      <Container size='xl'>
        <section className=' max-w-338 mx-auto py-10 sm:py-14 md:py-16 grid md:grid-cols-2 gap-8 md:gap-10 items-center'>
          <div>
            <h1 className='text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6'>
              About Our Store
            </h1>

            <p className='text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6'>
              Welcome to <span className='font-semibold'>Online Shopping</span>.
              We believe online shopping should be simple, enjoyable, and
              reliable. Our store offers carefully selected products designed to
              bring quality and value to our customers.
            </p>

            <p className='text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6'>
              From everyday essentials to unique finds, we aim to deliver a
              seamless shopping experience with fast delivery and friendly
              customer service.
            </p>
          </div>

          <div>
            <img
              src='https://images.unsplash.com/photo-1607082349566-187342175e2f'
              alt='online shopping'
              className='rounded-xl sm:rounded-2xl shadow-lg w-full h-auto object-cover'
            />
          </div>
        </section>

        <section className='max-w-6xl mx-auto py-5 sm:py-14 md:py-16 grid md:grid-cols-2 gap-8 md:gap-12 items-center'>
          <div className='order-2 md:order-1'>
            <img
              src='https://images.unsplash.com/photo-1556742049-0cfed4f6a45d'
              alt='shopping experience'
              className='rounded-xl sm:rounded-2xl shadow-lg w-full h-auto object-cover'
            />
          </div>

          <div className='order-1 md:order-2'>
            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gray-900'>
              Our Story
            </h2>

            <p className='text-gray-600 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4'>
              Our journey started with a simple goal: create an online store
              where customers can easily find high-quality products without
              spending hours searching.
            </p>

            <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
              We focus on product quality, smooth shopping experiences, and
              excellent customer support. Every product in our store is chosen
              with care to ensure it meets our standards.
            </p>
          </div>
        </section>

        <section className='bg-white py-10 sm:py-14 md:py-16'>
          <div className='max-w-6xl mx-auto text-center'>
            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8 sm:mb-12'>
              Why Shop With Us
            </h2>

            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10'>
              <div className='p-5 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition'>
                <div className='text-3xl sm:text-4xl mb-3 sm:mb-4'>🛍️</div>
                <h3 className='font-semibold text-base sm:text-lg mb-2'>
                  Quality Products
                </h3>
                <p className='text-gray-600 text-xs sm:text-sm'>
                  We carefully select products that meet our quality and value
                  standards.
                </p>
              </div>

              <div className='p-5 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition'>
                <div className='text-3xl sm:text-4xl mb-3 sm:mb-4'>🚚</div>
                <h3 className='font-semibold text-base sm:text-lg mb-2'>
                  Fast Delivery
                </h3>
                <p className='text-gray-600 text-xs sm:text-sm'>
                  Reliable shipping ensures your orders arrive quickly and
                  safely.
                </p>
              </div>

              <div className='p-5 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition sm:col-span-2 md:col-span-1'>
                <div className='text-3xl sm:text-4xl mb-3 sm:mb-4'>💬</div>
                <h3 className='font-semibold text-base sm:text-lg mb-2'>
                  Customer Support
                </h3>
                <p className='text-gray-600 text-xs sm:text-sm'>
                  Our support team is here to help whenever you need assistance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className='max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-14 md:py-16 text-center'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4'>
            Start Shopping Today
          </h2>

          <p className='text-gray-600 text-sm sm:text-base mb-5 sm:mb-6'>
            Discover products you love and enjoy a smooth online shopping
            experience.
          </p>

          <a
            href='/products'
            className='inline-block bg-black text-white text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-black/80 transition'
          >
            Browse Products
          </a>
        </section>
      </Container>
    </div>
  );
}
