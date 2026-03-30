import { useState, useEffect, useRef } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('cookie-consent') === null;
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const acceptBtnRef = useRef<HTMLButtonElement>(null);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setVisible(false);
  };

  useEffect(() => {
    if (visible) {
      acceptBtnRef.current?.focus();
    }
  }, [visible]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        reject();
      }
    };

    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    const focusableElements =
      modalRef.current?.querySelectorAll<HTMLButtonElement>('button');

    if (!focusableElements || focusableElements.length === 0) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className='fixed inset-0 z-5000 flex items-center justify-center backdrop-blur-sm'
      role='dialog'
      aria-modal='true'
      aria-labelledby='cookie-title'
      aria-describedby='cookie-description'
    >
      <div
        ref={modalRef}
        className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 mx-6 text-gray-900 focus:outline-none'
      >
        <div className='flex flex-col space-y-4'>
          <h2 id='cookie-title' className='text-lg sm:text-2xl font-extrabold'>
            We Value Your Privacy
          </h2>

          <p
            id='cookie-description'
            className='text-gray-700 text-sm sm:text-base leading-relaxed'
          >
            Our website uses cookies to personalize your experience, enhance
            security, and analyze traffic. By clicking
            <span className='font-semibold'> "Accept All Cookies"</span>, you
            consent to our cookie policy.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 mt-4'>
            <button
              ref={acceptBtnRef}
              type='button'
              onClick={accept}
              className='flex-1 text-sm sm:text-base bg-black text-white font-semibold py-2 rounded-xl shadow-md hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition'
            >
              Accept All Cookies
            </button>

            <button
              type='button'
              onClick={reject}
              className='flex-1 text-sm sm:text-base border border-gray-300 text-gray-800 font-semibold py-2 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition'
            >
              Only Necessary Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
