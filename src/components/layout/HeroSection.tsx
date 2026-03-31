import type { JSX } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection(): JSX.Element {
  return (
    <section
      aria-labelledby='hero-heading'
      aria-describedby='hero-description'
      className='min-h-[90vh] grid grid-cols-1 md:grid-cols-2 bg-white'
    >
      <div className='flex flex-col justify-center pl-5 xl:pl-28 py-10 sm:py-16'>
        <span className='uppercase tracking-[0.25em] text-xs text-gray-600 mb-3'>
          New Collection 2026
        </span>

        <h1
          id='hero-heading'
          className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-gray-900'
        >
          Elevate Your <br className='hidden sm:block' />
          Shopping Experience
        </h1>

        <p
          id='hero-description'
          className='mt-5 text-gray-700 text-base sm:text-lg max-w-md'
        >
          Discover curated products designed for modern lifestyles. Quality,
          style, and comfort — all in one place.
        </p>

        <div className='mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4'>
          <Link
            to='/products'
            aria-label='Shop product collection'
            className='w-full sm:w-auto text-sm sm:text-base text-center bg-black text-white px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition'
          >
            Shop Collection
          </Link>

          <Link
            to='/about'
            aria-label='Learn more about our brand'
            className='w-full sm:w-auto text-sm sm:text-base text-center border border-black/40 px-3 sm:px-6 py-2 sm:py-3  rounded-md hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition'
          >
            Learn More
          </Link>
        </div>

        <p className='mt-8 text-sm text-gray-500' role='note'>
          Free shipping • 30-day returns • Secure checkout
        </p>
      </div>

      <div className='relative h-[300px] sm:h-[400px] md:h-auto'>
        <img
          src='https://images.unsplash.com/photo-1521336575822-6da63fb45455'
          alt='Person showcasing modern fashion style in a lifestyle setting'
          className='w-full h-full object-cover'
        />

        <div
          className='hidden lg:block absolute bottom-10 right-10 bg-black/70 backdrop-blur-lg border border-white/20 rounded-xl p-4 w-64 text-white'
          aria-hidden='true'
        >
          <p className='text-sm opacity-70'>Trending</p>
          <p className='font-semibold'>Minimal Sneakers</p>
          <p className='text-lime-400 font-bold mt-1'>899 NOK</p>
        </div>
      </div>
    </section>
  );
}
