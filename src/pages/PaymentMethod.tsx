import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { checkoutSchema } from '../types/checkoutSchema';
import { useCartStore } from '../store/cartStore';
import { formatExpiryInput } from '../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { useState, type JSX } from 'react';
import { Loader } from '@mantine/core';

function formatPrice(num: number) {
  return num.toLocaleString('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    minimumFractionDigits: 0,
  });
}

type CheckoutFormData = z.infer<typeof checkoutSchema>;

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

export default function Checkout(): JSX.Element {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
  });

  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const cardHolder = useWatch({ control, name: 'cardHolder' });
  const cardNumber = useWatch({ control, name: 'cardNumber' });
  const expiryDate = useWatch({ control, name: 'expiryDate' });

  const subtotal = totalPrice();
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setValue('cardNumber', formatted, { shouldValidate: true });
  };

  const handleExpiryChange = (value: string) => {
    const formatted = formatExpiryInput(value);
    setValue('expiryDate', formatted, { shouldValidate: true });
  };

  const handlePayment = (data: CheckoutFormData) => {
    setCheckoutLoading(true);

    setTimeout(() => {
      clearCart();
      navigate('/checkout/success', { state: { items, formData: data } });
      setCheckoutLoading(false);
    }, 1200);
  };

  return (
    <form
      onSubmit={handleSubmit(handlePayment)}
      className='max-w-7xl mx-auto p-8 mt-2 pb-0 grid grid-cols-1 md:grid-cols-3 gap-10 font-sans text-gray-900'
      noValidate
      aria-labelledby='checkout-heading'
    >
      <div className='md:col-span-2 space-y-8'>
        <h1
          tabIndex={-1}
          className='text-2xl sm:text-4xl font-medium tracking-tight font-serif leading-tight'
        >
          Checkout
        </h1>

        <section className='bg-gray-100 border border-gray-200 rounded-2xl p-8 space-y-8'>
          <h2 className='text-2xl font-light tracking-tight font-serif leading-tight'>
            Shipping Information
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            <div>
              <input
                type='text'
                placeholder='Full Name'
                aria-invalid={!!errors.fullName}
                aria-describedby='fullName-error'
                {...register('fullName')}
                className={`w-full px-3 py-2.5 text-sm border rounded-lg bg-white transition
                  focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10
                  ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.fullName && (
                <p
                  id='fullName-error'
                  role='alert'
                  className='text-xs text-red-500 mt-1'
                >
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <input
                type='email'
                placeholder='Email'
                aria-invalid={!!errors.email}
                aria-describedby='email-error'
                {...register('email')}
                className={`w-full px-3 py-2.5 text-sm border rounded-lg bg-white transition
                  focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10
                  ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.email && (
                <p
                  id='email-error'
                  role='alert'
                  className='text-xs text-red-500 mt-1'
                >
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <input
              type='text'
              placeholder='Street Address'
              aria-invalid={!!errors.street}
              aria-describedby='street-error'
              {...register('street')}
              className={`w-full px-3 py-2.5 text-sm border rounded-lg bg-white transition
                focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10
                ${errors.street ? 'border-red-500' : 'border-gray-200'}`}
            />
            {errors.street && (
              <p
                id='street-error'
                role='alert'
                className='text-xs text-red-500 mt-1'
              >
                {errors.street.message}
              </p>
            )}
          </div>

          <div className='grid grid-cols-3 gap-5'>
            <div>
              <input
                type='text'
                placeholder='City'
                aria-invalid={!!errors.city}
                aria-describedby='city-error'
                {...register('city')}
                className={`w-full px-3 py-2.5 text-sm border rounded-lg bg-white transition
                  focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10
                  ${errors.city ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.city && (
                <p
                  id='city-error'
                  role='alert'
                  className='text-xs text-red-500 mt-1'
                >
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <input
                type='text'
                placeholder='Postal Code'
                maxLength={4}
                aria-invalid={!!errors.postalCode}
                aria-describedby='postalCode-error'
                {...register('postalCode')}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    ''
                  );
                }}
                className={`w-full px-3 py-2.5 text-sm border rounded-lg bg-white transition
                  focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10
                  ${errors.postalCode ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.postalCode && (
                <p
                  id='postalCode-error'
                  role='alert'
                  className='text-xs text-red-500 mt-1'
                >
                  {errors.postalCode.message}
                </p>
              )}
            </div>

            <div>
              <select
                {...register('country')}
                defaultValue=''
                aria-invalid={!!errors.country}
                aria-describedby='country-error'
                className={`w-full px-3 py-2.5 text-sm border rounded-lg bg-white transition
                  focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10
                  ${errors.country ? 'border-red-500' : 'border-gray-200'}`}
              >
                <option value=''>Select country</option>
                <option value='Norway'>Norway</option>
                <option value='USA'>USA</option>
                <option value='UK'>UK</option>
                <option value='Germany'>Germany</option>
                <option value='France'>France</option>
              </select>
              {errors.country && (
                <p
                  id='country-error'
                  role='alert'
                  className='text-xs text-red-500 mt-1'
                >
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className='bg-gray-100 border border-gray-200 rounded-2xl p-8 space-y-8'>
          <h2 className='text-2xl font-light tracking-tight font-serif leading-tight flex items-center gap-2'>
            Payment
            <span className='text-gray-400 text-sm'>🔒 Secure</span>
          </h2>

          <div className='bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-6 w-full max-w-sm mx-auto text-white shadow-sm'>
            <div className='mb-10 flex justify-between items-center'>
              <span className='text-xs opacity-60 tracking-wide'>
                Credit Card
              </span>
              <span className='text-lg'>💳</span>
            </div>

            <div className='text-xl tracking-[0.25em] mb-6'>
              {cardNumber || '•••• •••• •••• ••••'}
            </div>

            <div className='flex justify-between text-xs uppercase tracking-wider'>
              <div>
                <div className='opacity-50'>Cardholder</div>
                <div>{cardHolder || 'Your Name'}</div>
              </div>
              <div className='text-right'>
                <div className='opacity-50'>Expires</div>
                <div>{expiryDate || 'MM/YY'}</div>
              </div>
            </div>
          </div>

          <div className='space-y-5 max-w-sm mx-auto'>
            <input
              type='text'
              placeholder='Cardholder Name'
              aria-invalid={!!errors.cardHolder}
              aria-describedby='cardHolder-error'
              {...register('cardHolder')}
              className={`w-full px-3 py-2.5 text-sm border bg-white rounded-lg transition
                focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10
                ${errors.cardHolder ? 'border-red-500' : 'border-gray-200'}`}
            />

            <input
              type='text'
              placeholder='Card Number'
              maxLength={19}
              aria-invalid={!!errors.cardNumber}
              aria-describedby='cardNumber-error'
              value={cardNumber || ''}
              onChange={handleCardNumberChange}
              className={`w-full px-3 py-2.5 text-sm border bg-white rounded-lg transition
                focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10
                ${errors.cardNumber ? 'border-red-500' : 'border-gray-200'}`}
            />

            <div className='grid grid-cols-2 gap-5'>
              <input
                type='text'
                placeholder='Expiry Date (MM/YY)'
                maxLength={5}
                aria-invalid={!!errors.expiryDate}
                aria-describedby='expiryDate-error'
                value={expiryDate || ''}
                onChange={(e) => handleExpiryChange(e.target.value)}
                className={`w-full px-3 py-2.5 text-sm border bg-white rounded-lg transition
                  focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10
                  ${errors.expiryDate ? 'border-red-500' : 'border-gray-200'}`}
              />

              <input
                type='text'
                placeholder='CVC'
                maxLength={3}
                aria-invalid={!!errors.expiryDate}
                aria-describedby='expiryDate-error'
                {...register('cvc')}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    ''
                  );
                }}
                className={`w-full px-3 py-2.5 text-sm bg-white border rounded-lg transition
                  focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10
                  ${errors.cvc ? 'border-red-500' : 'border-gray-200'}`}
              />
            </div>

            <button
              type='submit'
              className='w-full bg-black cursor-pointer text-white py-2 rounded-md hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-70'
              disabled={checkoutLoading}
            >
              {checkoutLoading && <Loader size='xs' color='white' />}
              {checkoutLoading ? 'Processing...' : `Pay ${formatPrice(total)}`}
            </button>
          </div>
        </section>
      </div>

      <aside
        aria-label='Order Summary'
        className='bg-gray-100 backdrop-blur border border-gray-200 rounded-2xl p-6 mt-19 space-y-6 max-w-sm md:sticky md:top-25 self-start'
      >
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-light tracking-tight font-serif leading-tight'>
            Order Summary
          </h2>
          <span className='text-sm text-gray-400'>
            {items.length} item{items.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className='space-y-4'>
          {items.map((item) => (
            <div key={item.id} className='flex gap-3 items-start'>
              <div className='w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border'>
                <img
                  src={item.image}
                  alt={item.title}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-gray-900 line-clamp-2'>
                  {item.title}
                </p>
                <p className='text-xs text-gray-500 mt-1'>
                  Qty {item.quantity} × {formatPrice(item.price)}
                </p>
              </div>
              <div className='text-sm font-semibold text-gray-900 whitespace-nowrap'>
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className='border-t border-gray-200' />

        <div className='space-y-3 text-sm'>
          <div className='flex justify-between text-gray-600'>
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className='flex justify-between text-gray-600'>
            <span>Shipping</span>
            <span className='text-green-600 font-medium'>Free</span>
          </div>
        </div>

        <div className='border-t border-gray-200' />

        <div className='flex justify-between items-center'>
          <span className='text-base font-semibold text-gray-900'>Total</span>
          <span className='text-xl font-bold text-gray-900 tracking-tight'>
            {formatPrice(total)}
          </span>
        </div>

        <p className='text-xs text-gray-400 text-center pt-2'>
          Taxes included • Secure checkout
        </p>
      </aside>
    </form>
  );
}
