import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const sampleOrderItems = [
  {
    id: 1,
    name: 'External Hard Drive',
    quantity: 1,
    price: 149.99,
    image: 'https://placehold.co/48x48',
  },
  {
    id: 2,
    name: 'Gold headphones',
    quantity: 1,
    price: 382.49,
    image: 'https://placehold.co/48x48',
  },
];

function formatPrice(num: number) {
  return `$${num.toFixed(2)}`;
}

const checkoutSchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Invalid email address'),
  street: z.string().min(1, 'Street Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z
    .string()
    .regex(/^\d{1,4}$/, 'Postal code must be 1 to 4 digits'),
  country: z.string().min(1, 'Country is required'),
  cardHolder: z.string().min(1, 'Cardholder Name is required'),
  cardNumber: z
    .string()
    .regex(
      /^\d{4} \d{4} \d{4} \d{4}$/,
      'Card number must be in format 1234 5678 9012 3456'
    ),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format'),
  cvc: z.string().regex(/^\d+$/, 'CVC must be numbers'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

function formatExpiry(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/^([2-9])$/, '0$1')
    .replace(/^(\d\d)(\d)$/g, '$1/$2')
    .slice(0, 5);
}

export default function Checkout() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: CheckoutFormData) => {
    alert('Form submitted!\n' + JSON.stringify(data, null, 2));
  };

  const cardHolder = watch('cardHolder');
  const cardNumber = watch('cardNumber');
  const expiryDate = watch('expiryDate');

  const subtotal = sampleOrderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setValue('cardNumber', formatted, { shouldValidate: true });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setValue('expiryDate', formatted, { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-10 font-sans text-gray-900'
      noValidate
    >
      <div className='md:col-span-2 space-y-10'>
        <h1 className='text-3xl font-bold mb-6'>Checkout</h1>

        <section className='bg-white p-6 rounded-lg shadow space-y-6'>
          <h2 className='text-xl font-semibold mb-4'>Shipping Information</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <input
                type='text'
                placeholder='Full Name'
                {...register('fullName')}
                className={`input-field ${
                  errors.fullName ? 'border-red-500' : ''
                }`}
              />
              {errors.fullName && (
                <p className='text-red-600 text-sm mt-1'>
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <input
                type='email'
                placeholder='Email'
                {...register('email')}
                className={`input-field ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className='text-red-600 text-sm mt-1'>
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <input
              type='text'
              placeholder='Street Address'
              {...register('street')}
              className={`input-field ${errors.street ? 'border-red-500' : ''}`}
            />
            {errors.street && (
              <p className='text-red-600 text-sm mt-1'>
                {errors.street.message}
              </p>
            )}
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <input
                type='text'
                placeholder='City'
                {...register('city')}
                className={`input-field ${errors.city ? 'border-red-500' : ''}`}
              />
              {errors.city && (
                <p className='text-red-600 text-sm mt-1'>
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <input
                type='text'
                placeholder='Postal Code'
                {...register('postalCode')}
                maxLength={4}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    ''
                  );
                }}
                className={`input-field ${
                  errors.postalCode ? 'border-red-500' : ''
                }`}
              />
              {errors.postalCode && (
                <p className='text-red-600 text-sm mt-1'>
                  {errors.postalCode.message}
                </p>
              )}
            </div>
            <div>
              <select
                {...register('country')}
                className={`input-field ${
                  errors.country ? 'border-red-500' : ''
                }`}
                defaultValue=''
              >
                <option value=''>Select country</option>
                <option value='Norway'>Norway</option>
                <option value='USA'>USA</option>
                <option value='UK'>UK</option>
                <option value='Germany'>Germany</option>
                <option value='France'>France</option>
              </select>
              {errors.country && (
                <p className='text-red-600 text-sm mt-1'>
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className='bg-white p-6 rounded-lg shadow space-y-6'>
          <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
            <span>Payment</span>
            <span
              title='Secure checkout'
              className='text-gray-400 text-sm'
              aria-label='Secure checkout'
            >
              🔒
            </span>
          </h2>

          <div className='bg-gradient-to-tr from-blue-900 to-blue-700 rounded-xl p-6 w-full max-w-sm mx-auto text-white font-mono tracking-widest shadow-lg relative select-none'>
            <div className='mb-8 flex justify-between'>
              <div>💳</div>
              <div className='text-sm'>Credit Card</div>
            </div>
            <div className='text-xl tracking-[0.3em] mb-6 min-h-[2.5rem]'>
              {cardNumber || '•••• •••• •••• ••••'}
            </div>
            <div className='flex justify-between text-xs uppercase'>
              <div>
                <div className='opacity-60'>Cardholder</div>
                <div>{cardHolder ? cardHolder.toUpperCase() : 'Your Name'}</div>
              </div>
              <div className='text-right'>
                <div className='opacity-60'>Expires</div>
                <div>{expiryDate || 'MM/YY'}</div>
              </div>
            </div>
          </div>

          <div className='space-y-4 max-w-sm mx-auto'>
            <div>
              <input
                type='text'
                placeholder='Cardholder Name'
                {...register('cardHolder')}
                className={`input-field ${
                  errors.cardHolder ? 'border-red-500' : ''
                }`}
              />
              {errors.cardHolder && (
                <p className='text-red-600 text-sm mt-1'>
                  {errors.cardHolder.message}
                </p>
              )}
            </div>
            <div>
              <input
                type='text'
                placeholder='Card Number'
                maxLength={19}
                value={cardNumber}
                onChange={handleCardNumberChange}
                className={`input-field ${
                  errors.cardNumber ? 'border-red-500' : ''
                }`}
              />
              {errors.cardNumber && (
                <p className='text-red-600 text-sm mt-1'>
                  {errors.cardNumber.message}
                </p>
              )}
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <input
                  type='text'
                  placeholder='Expiry Date (MM/YY)'
                  maxLength={5}
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  className={`input-field ${
                    errors.expiryDate ? 'border-red-500' : ''
                  }`}
                />
                {errors.expiryDate && (
                  <p className='text-red-600 text-sm mt-1'>
                    {errors.expiryDate.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type='text'
                  placeholder='CVC'
                  {...register('cvc')}
                  maxLength={4}
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /\D/g,
                      ''
                    );
                  }}
                  className={`input-field ${
                    errors.cvc ? 'border-red-500' : ''
                  }`}
                />
                {errors.cvc && (
                  <p className='text-red-600 text-sm mt-1'>
                    {errors.cvc.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type='submit'
              className='w-full mt-6 bg-red-600 text-white font-semibold py-3 rounded hover:bg-red-700 transition'
            >
              Pay {formatPrice(total)}
            </button>
          </div>
        </section>
      </div>

      <aside className='bg-white p-6 rounded-lg shadow space-y-4 max-w-sm md:sticky md:top-8 self-start'>
        <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>

        <div className='space-y-4'>
          {sampleOrderItems.map((item) => (
            <div key={item.id} className='flex items-center gap-3'>
              <img
                src={item.image}
                alt={item.name}
                className='w-12 h-12 rounded object-cover'
              />
              <div className='flex-1'>
                <p className='font-medium'>{item.name}</p>
                <p className='text-xs text-gray-500'>
                  Qty: {item.quantity} x {formatPrice(item.price)}
                </p>
              </div>
              <div className='font-semibold'>{formatPrice(item.price)}</div>
            </div>
          ))}
        </div>

        <hr />

        <div className='flex justify-between text-sm text-gray-600'>
          <span>Items ({sampleOrderItems.length})</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className='flex justify-between text-sm text-green-600 font-medium'>
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <div className='flex justify-between text-lg font-bold mt-2'>
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </aside>

      <style>{`
        .input-field {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          font-size: 1rem;
          transition: border-color 0.2s ease;
        }
        .input-field:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgb(37 99 235 / 0.3);
        }
        .border-red-500 {
          border-color: #ef4444 !important;
        }
      `}</style>
    </form>
  );
}
