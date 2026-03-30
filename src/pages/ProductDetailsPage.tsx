import { useParams } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useProduct } from '../hooks/useProduct';
import ProductDetailsLayout from '../components/layout/ProductDetailsLayout';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { Container } from '@mantine/core';
import type { JSX } from 'react';

export default function ProductDetailsPage(): JSX.Element {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);

  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) return <p className='p-10'>Loading...</p>;
  if (error || !product) return <p className='p-10'>Product not found.</p>;

  const handleAddToCart = (quantity: number) => {
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.discountedPrice ?? product.price,
        originalPrice: product.price,
        image: product.image.url,
        rating: product.rating ?? 0,
      },
      quantity
    );
  };

  return (
    <div>
      <Container size='xl' className='pt-5 md:pt-10 text-sm'>
        <Breadcrumbs productName={product.title} />
      </Container>
      <ProductDetailsLayout product={product} onAddToCart={handleAddToCart} />
    </div>
  );
}
