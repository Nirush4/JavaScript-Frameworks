import type { Product } from '../../types/product';
import { useCartStore } from '../../store/cartStore';
import { calculateDiscountDetails } from '../../lib/utils/discount';
import { Rating } from '@mantine/core';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, title, image, price, discountedPrice, rating } = product;

  const addToCart = useCartStore((state) => state.addToCart);

  const { hasDiscount, discountPercent, finalPrice } = calculateDiscountDetails(
    {
      price,
      discountedPrice,
    }
  );

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      price: finalPrice,
      originalPrice: price,
      image: image.url,
      rating: rating ?? 0,
    });
  };

  return (
    <div
      key={id}
      className='relative bg-white rounded-md shadow-sm overflow-hidden transition-transform duration-300 hover:scale-[1.03] hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500'
      role='group'
      aria-labelledby={`product-title-${id}`}
      tabIndex={0}
    >
      <div className='relative w-full'>
        <img
          src={image.url}
          alt={image.alt}
          className='w-full h-40 sm:h-56 md:h-60 object-cover'
        />

        {hasDiscount && (
          <span
            className='absolute top-2 left-2 bg-green-500 text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-lg z-10'
            aria-label={`${discountPercent}% off`}
          >
            {discountPercent}% OFF
          </span>
        )}
      </div>

      <div className='p-4 flex flex-col'>
        <h2 id={`product-title-${id}`} className='font-medium mb-1'>
          <span className='line-clamp-1 sm:hidden'>{title}</span>
          <span className='hidden sm:inline line-clamp-2'>{title}</span>
        </h2>

        <div className='flex items-center gap-2 mb-1'>
          <span className='font-bold text-base sm:text-lg'>
            {finalPrice.toLocaleString('nb-NO', {
              style: 'currency',
              currency: 'NOK',
              minimumFractionDigits: 0,
            })}
          </span>
          {hasDiscount && (
            <span
              className='text-gray-500 text-sm line-through'
              aria-label={`Original price $${price.toFixed(2)}`}
            >
              $
              {price.toLocaleString('nb-NO', {
                style: 'currency',
                currency: 'NOK',
                minimumFractionDigits: 0,
              })}
            </span>
          )}
        </div>

        <div className='mb-3'>
          <Rating
            value={rating}
            readOnly
            fractions={2}
            size={16}
            aria-label={`Rated ${rating} out of 5`}
          />
        </div>

        <button
          className='w-full bg-black text-white py-1 cursor-pointer sm:py-2 rounded-md hover:bg-gray-700 transition text-s sm:text-base'
          aria-label={`Add ${title} to cart`}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
