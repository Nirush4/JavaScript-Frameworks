import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section
      aria-labelledby='hero-heading'
      className='relative h-[95vh] w-full flex items-center bg-cover bg-center'
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1674027392887-751d6396b710?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
            className='bg-white text-black px-6 py-3 font-medium rounded-none hover:bg-green-600 hover:text-white transition-colors duration-300'
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
}
