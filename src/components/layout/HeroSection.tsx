import type { JSX } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection(): JSX.Element {
  return (
    <section
      aria-labelledby='hero-heading'
      aria-describedby='hero-description'
      className='relative h-[95vh] w-full flex items-center bg-cover bg-center'
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/happy-couple-having-fun-while-online-shopping-home_637285-12597.jpg?semt=ais_user_personalization&w=740&q=80')",
      }}
    >
      <div className='absolute inset-0 bg-black/60' aria-hidden='true'></div>

      <span className='sr-only'>
        Background image showing a couple enjoying online shopping at home.
      </span>

      <div className='relative z-10 flex flex-col items-center container mx-auto px-4 lg:px-0 text-center'>
        <h1
          id='hero-heading'
          className='text-white font-bold tracking-wide leading-none text-3xl sm:text-6xl'
        >
          New Season Arrivals
        </h1>

        <p
          id='hero-description'
          className='mt-4 mb-8 text-white font-light max-w-lg text-base sm:text-lg md:text-xl'
        >
          Discover products that fit your lifestyle.
        </p>

        <div>
          <Link
            to='/products'
            className='bg-white text-black px-6 py-3 font-medium rounded-full hover:bg-lime-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-colors duration-300'
          >
            Explore Products
          </Link>
        </div>
      </div>
    </section>
  );
}
