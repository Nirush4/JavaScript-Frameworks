import { useState, type JSX } from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Terms & Conditions', href: '/termsconditions' },
];

export default function Footer(): JSX.Element {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubscribe = () => {
    setError('');
    setSuccess('');

    if (!email) {
      setError('Email is required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setSuccess('🎉 Subscribed successfully!');
    setEmail('');
  };

  const socialLinks = [
    {
      icon: <FaInstagram />,
      href: 'https://instagram.com',
      color: 'bg-gradient-to-tr from-pink-500 to-yellow-400',
    },
    {
      icon: <FaFacebook />,
      href: 'https://facebook.com',
      color: 'bg-gradient-to-tr from-blue-600 to-blue-400',
    },
    {
      icon: <FaTwitter />,
      href: 'https://twitter.com',
      color: 'bg-gradient-to-tr from-blue-400 to-cyan-300',
    },
  ];

  return (
    <footer className='bg-gray-50 py-10 border-t border-gray-200'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-05 sm:gap-10'>
          <div className='flex-1 bg-white p-6 rounded-xl shadow-md'>
            <h3 className='text-base sm:text-xl font-bold mb-2'>
              Subscribe to our Newsletter
            </h3>
            <p className='text-sm sm:text-base text-gray-600 mb-4'>
              Get the latest updates and offers directly in your inbox.
            </p>

            <div className='flex flex-col sm:flex-row gap-2'>
              <input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition
                  ${
                    error
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-green-400'
                  }`}
              />
              <button
                onClick={handleSubscribe}
                className='px-6 py-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700 transition transform hover:scale-105'
              >
                Subscribe
              </button>
            </div>

            {error && (
              <p className='text-red-600 text-sm mt-2 font-medium'>{error}</p>
            )}
            {success && (
              <p className='text-green-800 text-base sm:text-base mt-2 font-bold bg-green-100 p-2 rounded-lg shadow-sm'>
                {success}
              </p>
            )}
          </div>

          <div className='flex-1 mt-6 md:mt-0'>
            <h3 className='text-base sm:text-xl font-semibold mb-2 text-gray-800'>
              Follow Us
            </h3>
            <div className='flex gap-3'>
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-gray-600 hover:bg-black hover:text-white transition transform hover:scale-105'
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className='border-t border-gray-300 my-8'></div>

        <div className='flex flex-col md:flex-row md:justify-between items-center gap-4'>
          <div className='flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start'>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className='text-gray-700 hover:text-green-600 text-sm sm:text-base font-medium hover:underline transition'
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className='text-gray-500 text-xs sm:text-sm mt-2 md:mt-0 text-center md:text-left'>
            &copy; {new Date().getFullYear()} My Online Shop. All rights
            reserved. Designed & built by{' '}
            <a
              target='blank'
              href='https://www.linkedin.com/in/nirushan-rajamanoharan/'
              className='font-bold text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text'
            >
              NIRUSH.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
