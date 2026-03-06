import { useState } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('cookie-consent') === null;
  });

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm'>
      <div className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 mx-6 text-gray-900'>
        <div className='flex flex-col space-y-4'>
          <h2 className='text-lg sm:text-2xl font-extrabold'>
            We Value Your Privacy
          </h2>

          <p className='text-gray-700 text-sm sm:text-base leading-relaxed'>
            Our website uses cookies to personalize your experience, enhance
            security, and analyze traffic. By clicking
            <span className='font-semibold'> "Accept All Cookies"</span>, you
            consent to our cookie policy.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 mt-4'>
            <button
              onClick={accept}
              className='flex-1 text-sm sm:text-base bg-black text-white font-semibold py-2 rounded-xl shadow-md hover:bg-black/80 transition-all duration-300 cursor-pointer'
            >
              Accept All Cookies
            </button>

            <button
              onClick={reject}
              className='flex-1 text-sm sm:text-base border border-gray-300 text-gray-800 font-semibold py-2 rounded-xl hover:bg-gray-200 transition-all duration-300 cursor-pointer'
            >
              Only Necessary Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
