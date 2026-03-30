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

    toast.success(`${product.title} (${quantity}) added to cart!`, {
      position: 'top-right',
      autoClose: 3000,
      role: 'status',
    });
  };

  return (
    <section className='py-2 md:py-7' aria-labelledby='product-details-title'>
      <Container size='xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12'>
          <div>
            <img
              src={product.image.url}
              alt={product.image.alt || product.title}
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
              <p className='mb-4 text-gray-600' role='status'>
                No ratings yet
              </p>
            )}

            <div
              className='flex items-center gap-4 mb-3 flex-wrap'
              aria-describedby='price-description'
            >
              <span className='text-xl sm:text-2xl font-bold text-red-600'>
                {finalPrice.toLocaleString('nb-NO', {
                  style: 'currency',
                  currency: 'NOK',
                  minimumFractionDigits: 0,
                })}
              </span>

              {hasDiscount && (
                <>
                  <span className='line-through text-gray-700'>
                    {product.price.toLocaleString('nb-NO', {
                      style: 'currency',
                      currency: 'NOK',
                      minimumFractionDigits: 0,
                    })}
                  </span>

                  <span className='bg-green-600 text-white px-2 py-0.5 rounded'>
                    -{discountPercent}%
                  </span>
                </>
              )}

              <span id='price-description' className='sr-only'>
                {hasDiscount
                  ? `Discounted price ${finalPrice}, originally ${product.price}`
                  : `Price ${finalPrice}`}
              </span>
            </div>

            <p className='text-gray-700 mb-3 leading-relaxed'>
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
                    className='text-xs bg-gray-600 text-white px-3 py-1 rounded-full'
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

              <div
                className='flex items-center border rounded-md overflow-hidden'
                role='group'
                aria-label='Select quantity'
              >
                <button
                  type='button'
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className='px-3 py-1 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black'
                  aria-label='Decrease quantity'
                >
                  −
                </button>

                <span
                  id='product-quantity'
                  className='px-4 font-semibold'
                  aria-live='polite'
                >
                  {quantity}
                </span>

                <button
                  type='button'
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className='px-3 py-1 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black'
                  aria-label='Increase quantity'
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className='w-full bg-black cursor-pointer text-white py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition'
              aria-describedby='add-to-cart-description'
            >
              Add to Cart
            </button>

            <span id='add-to-cart-description' className='sr-only'>
              Adds {quantity} of {product.title} to your shopping cart
            </span>

            <div aria-labelledby='product-reviews-title' className='mt-10'>
              <h2
                id='product-reviews-title'
                className='text-base sm:text-lg font-light mb-4'
              >
                Customer Reviews
              </h2>

              {product.reviews && product.reviews.length > 0 ? (
                <div className='space-y-6'>
                  {product.reviews.map((review) => (
                    <article
                      key={review.id}
                      className='border-b pb-4'
                      aria-label={`Review by ${review.username}`}
                    >
                      <div className='flex items-center justify-between mb-2'>
                        <strong>{review.username}</strong>
                        <Rating
                          value={review.rating}
                          readOnly
                          size='sm'
                          aria-label={`Rated ${review.rating} out of 5`}
                        />
                      </div>
                      <p className='text-gray-700'>{review.description}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className='text-gray-600' role='status'>
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
