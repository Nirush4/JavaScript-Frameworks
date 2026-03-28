import { Container } from '@mantine/core';
import AllProductsSection from '../components/layout/ProductGrid';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import type { JSX } from 'react';

function ProductsPage(): JSX.Element {
  return (
    <div>
      <Container size='xl' className='pt-10'>
        <Breadcrumbs />
      </Container>
      <AllProductsSection />
    </div>
  );
}

export default ProductsPage;
