import { useEffect } from 'react';
import { useCartStore } from '../../store/cartStore';

import { useNavigate } from 'react-router-dom';
import { IconTrash, IconX } from '@tabler/icons-react';
import { Rating } from '@mantine/core';
import { calculateDiscountDetails } from '../../lib/utils/discount';

interface CartDrawerProps {
  opened: boolean;
  onClose: () => void;
}

export default function ShoppingCart({ opened, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/products');
    onClose();
  };

  const handleCheckout = () => {
    navigate('/success');
    clearCart();
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = opened ? 'hidden' : 'auto';
  }, [opened]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          opened ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-md bg-white z-[9999] shadow-xl 
          transform transition-transform duration-300 flex flex-col
          ${opened ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className='flex items-center justify-between p-5 border-b bg-white shrink-0 z-1000'>
          <h2 className='text-lg font-bold'>Shopping Cart</h2>
          <button
            onClick={onClose}
            className='p-1 rounded hover:bg-gray-200 transition cursor-pointer'
            aria-label='Close cart'
          >
            <IconX size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className='flex-1 flex items-center justify-center p-4'>
            <p className='text-gray-500'>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className='flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50'>
              {items.map((item) => {
                const { hasDiscount, finalPrice, discountPercent } =
                  calculateDiscountDetails({
                    price: item.originalPrice ?? item.price,
                    discountedPrice: item.price,
                  });

                return (
                  <div
                    key={item.id}
                    className='grid grid-cols-[80px_1fr_auto] gap-2 bg-white p-4 rounded-xl shadow-sm'
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className='w-20 h-20 object-cover rounded-md row-span-3'
                      />
                    )}

                    <div className='space-y-1'>
                      <h3 className='text-sm font-semibold line-clamp-2'>
                        {item.title}
                      </h3>

                      {item.rating !== undefined && (
                        <Rating
                          value={item.rating}
                          readOnly
                          fractions={2}
                          size='sm'
                          mt='xs'
                          aria-label={`Rated ${item.rating} out of 5`}
                        />
                      )}

                      <div className='flex items-center gap-2 text-sm'>
                        <span
                          className={`font-bold ${
                            hasDiscount ? 'text-red-600' : 'text-black'
                          }`}
                        >
                          {finalPrice.toLocaleString('nb-NO', {
                            style: 'currency',
                            currency: 'NOK',
                            minimumFractionDigits: 0,
                          })}
                        </span>

                        {hasDiscount && (
                          <>
                            <span className='line-through text-gray-400'>
                              {item.originalPrice?.toLocaleString('nb-NO', {
                                style: 'currency',
                                currency: 'NOK',
                                minimumFractionDigits: 0,
                              })}
                            </span>
                            <span className='text-green-600 text-s font-medium'>
                              -{discountPercent}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className='flex flex-col items-end gap-2'>
                      <input
                        type='number'
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className='w-10 text-center border rounded-md text-sm font-semibold'
                      />

                      <div
                        onClick={() => removeFromCart(item.id)}
                        className='flex items-center gap-1 border text-sm rounded px-1 border-red-500 text-red-600 hover:bg-red-100 cursor-pointer'
                      >
                        <IconTrash size={14} />
                        Remove
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className='border-t p-4 bg-white shrink-0'>
              <div className='flex justify-between font-semibold mb-2'>
                <span className='font-bold'>Total:</span>
                <span className='font-bold'>
                  {totalPrice().toLocaleString('nb-NO', {
                    style: 'currency',
                    currency: 'NOK',
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>

              <div className='space-y-2'>
                <button
                  onClick={clearCart}
                  className='w-full border rounded-md py-2 hover:bg-gray-100 transition cursor-pointer'
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleContinueShopping}
                  className='w-full border rounded-md py-2 hover:bg-gray-100 transition cursor-pointer'
                >
                  Continue Shopping
                </button>

                <button
                  onClick={handleCheckout}
                  className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 cursor-pointer transition'
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
