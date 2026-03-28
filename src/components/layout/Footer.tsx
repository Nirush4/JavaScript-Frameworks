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

    setSuccess('Subscribed successfully!');
    setEmail('');
  };

  const socialLinks = [
    {
      icon: <FaInstagram aria-hidden='true' />,
      href: 'https://instagram.com',
      label: 'Instagram',
    },
    {
      icon: <FaFacebook aria-hidden='true' />,
      href: 'https://facebook.com',
      label: 'Facebook',
    },
    {
      icon: <FaTwitter aria-hidden='true' />,
      href: 'https://twitter.com',
      label: 'Twitter',
    },
  ];

  return (
    <footer
      className='bg-gray-50 py-10 border-t border-gray-200'
      aria-labelledby='footer-heading'
    >
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>

      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-5 sm:gap-10'>
          {/* Newsletter */}
          <div className='flex-1 bg-white p-6 rounded-xl shadow-md'>
            <h3 className='text-base sm:text-xl font-bold mb-2'>
              Subscribe to our Newsletter
            </h3>

            <p className='text-sm sm:text-base text-gray-700 mb-4'>
              Get the latest updates and offers directly in your inbox.
            </p>

            <div className='flex flex-col sm:flex-row gap-2'>
              <div className='flex-1'>
                <label htmlFor='newsletter-email' className='sr-only'>
                  Email address
                </label>

                <input
                  id='newsletter-email'
                  type='email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                    setSuccess('');
                  }}
                  aria-invalid={!!error}
                  aria-describedby='email-error email-success'
                  placeholder='Enter your email'
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition
                    ${
                      error
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-green-500'
                    }`}
                />
              </div>

              <button
                type='button'
                onClick={handleSubscribe}
                className='px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition'
              >
                Subscribe
              </button>
            </div>

            {error && (
              <p
                id='email-error'
                className='text-red-600 text-sm mt-2 font-medium'
                role='alert'
              >
                {error}
              </p>
            )}

            {success && (
              <p
                id='email-success'
                className='text-green-800 text-sm mt-2 font-bold bg-green-100 p-2 rounded-lg'
                role='status'
              >
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
                <a
                  key={index}
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`Visit our ${link.label} page`}
                  className='w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-gray-600 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black transition'
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='border-t border-gray-300 my-8'></div>

        <nav aria-label='Footer navigation'>
          <div className='flex flex-col items-center gap-4'>
            <div className='flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start'>
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className='text-gray-700 hover:text-green-600 text-sm sm:text-base font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-green-600 rounded transition'
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <p className='text-gray-600 text-xs sm:text-sm text-center md:text-left'>
              &copy; {new Date().getFullYear()} My Online Shop. All rights
              reserved. This is a student project created for educational
              purposes. Designed & built by{' '}
              <a
                href='https://www.linkedin.com/in/nirushan-rajamanoharan/'
                target='_blank'
                rel='noopener noreferrer'
                className='font-bold text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text focus:outline-none focus:ring-2 focus:ring-black rounded'
              >
                NIRUSH
              </a>
            </p>
          </div>
        </nav>
      </div>
    </footer>
  );
}
