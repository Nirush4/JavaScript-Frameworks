import { Container, Rating } from '@mantine/core';
import type { Product } from '../../types/product';
import { calculateDiscountDetails } from '../../lib/utils/discount';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ProductDetailsLayoutProps {
  product: Product;
  onAddToCart: (quantity: number) => void;
}

export default function ProductDetailsLayout({
  product,
  onAddToCart,
}: ProductDetailsLayoutProps) {
  const [quantity, setQuantity] = useState(1);

  const { hasDiscount, finalPrice, discountPercent } = calculateDiscountDetails(
    {
      price: product.price,
      discountedPrice: product.discountedPrice,
    }
  );

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

  const handleAddToCart = () => {
    onAddToCart(quantity);

    toast.success(`${product.title} (${quantity}) added to cart! 🛒`, {
      position: 'top-right',
      autoClose: 3000,
      style: {
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        background: '#f6f6f4',
        color: '#000000',
        fontWeight: 'bold',
        fontSize: '14px',
      },
    });
  };

  return (
    <section
      className='py-2 md:py-7'
      aria-labelledby='product-details-title'
      role='region'
    >
      <Container size='xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12'>
          <div>
            <img
              src={product.image.url}
              alt={product.image.alt}
              className='w-full h-80 sm:h-96 md:h-125 object-cover rounded-md'
            />
          </div>

          <div className='flex flex-col'>
            <h1
              id='product-details-title'
              className='text-xl sm:text-2xl font-medium mb-3'
            >
              {product.title}
            </h1>

            {product.rating ? (
              <Rating
                value={product.rating}
                readOnly
                fractions={2}
                size='md'
                className='mb-3'
                aria-label={`Rated ${product.rating} out of 5`}
              />
            ) : (
              <div
                className='mb-4 text-sm sm:text-base text-gray-500'
                role='status'
              >
                No ratings yet
              </div>
            )}

            <div className='flex items-center gap-4 mb-3 flex-wrap'>
              <span
                className='text-xl sm:text-2xl font-bold text-red-500'
                aria-label={`Price: ${finalPrice.toLocaleString('nb-NO', {
                  style: 'currency',
                  currency: 'NOK',
                  minimumFractionDigits: 0,
                })}`}
              >
                {finalPrice.toLocaleString('nb-NO', {
                  style: 'currency',
                  currency: 'NOK',
                  minimumFractionDigits: 0,
                })}
              </span>

              {hasDiscount && (
                <>
                  <span
                    className='line-through text-black'
                    aria-label={`Original price: ${product.price.toLocaleString(
                      'nb-NO',
                      {
                        style: 'currency',
                        currency: 'NOK',
                        minimumFractionDigits: 0,
                      }
                    )}`}
                  >
                    {product.price.toLocaleString('nb-NO', {
                      style: 'currency',
                      currency: 'NOK',
                      minimumFractionDigits: 0,
                    })}
                  </span>

                  <span
                    className='bg-green-500 text-white px-2 py-0.5 text-sm sm:text-base rounded'
                    aria-label={`Discount: ${discountPercent}% off`}
                  >
                    -{discountPercent}%
                  </span>
                </>
              )}
            </div>

            <p className='text-gray-600 mb-3 leading-relaxed'>
              {product.description}
            </p>

            {product.tags && product.tags.length > 0 && (
              <div
                className='mb-3 flex flex-wrap gap-2'
                aria-label='Product tags'
              >
                {product.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className='text-xs bg-gray-500 text-white px-3 py-1 rounded-full'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className='flex items-center gap-4 mb-5 sm:mb-12 mt-3 sm:mt-5'>
              <label htmlFor='product-quantity' className='font-medium'>
                Quantity:
              </label>
              <div className='flex items-center border rounded-md overflow-hidden'>
                <button
                  type='button'
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className='px-3 py-1 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition'
                  aria-label='Decrease quantity'
                >
                  −
                </button>

                <span
                  className='px-4 font-semibold select-none'
                  aria-live='polite'
                >
                  {quantity}
                </span>

                <button
                  type='button'
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className='px-3 py-1 hover:bg-gray-100 transition'
                  aria-label='Increase quantity'
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className='w-full bg-black text-white py-2 sm:py-2 hover:bg-gray-700 transition text-sm sm:text-base cursor-pointer mb-6'
              aria-label={`Add ${quantity} of ${product.title} to cart`}
            >
              Add to Cart
            </button>

            <div aria-labelledby='product-reviews-title'>
              <h2
                id='product-reviews-title'
                className='text-base sm:text-lg font-light mb-4 sm:mb-3'
              >
                Customer Reviews
              </h2>

              {product.reviews && product.reviews.length > 0 ? (
                <div className='space-y-6'>
                  {product.reviews.map((review) => (
                    <div
                      key={review.id}
                      className='border-b pb-4'
                      role='region'
                      aria-label={`Review by ${review.username}`}
                    >
                      <div className='flex items-center justify-between mb-2'>
                        <strong className='text-sm sm:text-base'>
                          {review.username}
                        </strong>
                        <Rating
                          value={review.rating}
                          readOnly
                          size='sm'
                          aria-label={`Rated ${review.rating} out of 5`}
                        />
                      </div>
                      <p className='text-gray-600 text-sm sm:text-base'>
                        {review.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-gray-500' role='status'>
                  No reviews yet. Be the first to review this product.
                </p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
