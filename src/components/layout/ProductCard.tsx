import type { Product } from '../../types/product';
import { useCartStore } from '../../store/cartStore';
import { calculateDiscountDetails } from '../../lib/utils/discount';
import { Button, Rating } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, title, image, price, discountedPrice, rating } = product;

  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const { hasDiscount, discountPercent, finalPrice } = calculateDiscountDetails(
    {
      price,
      discountedPrice,
    }
  );

  const handleNavigate = () => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    addToCart({
      id,
      title,
      price: finalPrice,
      originalPrice: price,
      image: image.url,
      rating: rating ?? 0,
    });

    toast.success(`${title} added to cart! 🛒`, {
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
    <div
      onClick={handleNavigate}
      className='relative bg-white shadow-sm overflow-hidden transition-transform duration-300  rounded-2xl hover:scale-[1.02] hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500'
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
            className='absolute top-2 left-2 bg-green-500 text-white text-xs sm:text-sm font-semibold px-2 py-1 z-10'
            aria-label={`${discountPercent}% off`}
          >
            {discountPercent}% OFF
          </span>
        )}
      </div>

      <div className='p-2 sm:p-4 flex flex-col'>
        <h2 id={`product-title-${id}`} className='font-medium mb-1'>
          <span className='line-clamp-1 sm:hidden'>{title}</span>
          <span className='hidden sm:inline line-clamp-2'>{title}</span>
        </h2>

        <div className='flex items-center gap-2 mb-1'>
          <span className='font-bold text-sm text-red-500 sm:text-lg'>
            {finalPrice.toLocaleString('nb-NO', {
              style: 'currency',
              currency: 'NOK',
              minimumFractionDigits: 0,
            })}
          </span>
          {hasDiscount && (
            <span className='text-black font-medium text-sm line-through'>
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

        <Button
          variant='filled'
          color='black'
          aria-label={`Add ${title} to cart`}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
