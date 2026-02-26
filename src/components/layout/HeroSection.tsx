import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section
      aria-labelledby='hero-heading'
      className='relative h-[95vh] w-full flex items-center bg-cover bg-center'
      style={{
        backgroundImage:
          "url('https://getjaybe.com/storage/2021/12/Best-Online-Shopping-Sites-in-Egypt.jpg')",
      }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-black/50' aria-hidden='true'></div>

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center container mx-auto px-4 lg:px-0 text-left sm:text-center'>
        <h1
          id='hero-heading'
          className='text-white font-bold tracking-wide text-center leading-none text-3xl sm:text-5xl'
        >
          NEW SEASON ARRIVALS
        </h1>

        <p className='mt-4 mb-8 text-white font-light max-w-lg text-base sm:text-lg md:text-xl mx-auto sm:mx-0'>
          Discover products that fit your lifestyle.
        </p>

        <div className='flex sm:justify-start justify-center'>
          <Link
            to='/'
            aria-label="Shop men's collection"
            className='bg-white text-black px-6 py-3 font-medium rounded-full hover:bg-lime-600 hover:text-white transition-colors duration-300'
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
}
