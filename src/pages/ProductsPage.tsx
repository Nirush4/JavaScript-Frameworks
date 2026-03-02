import { Container } from '@mantine/core';
import AllProductsSection from '../components/layout/ProductGrid';
import Breadcrumbs from '../components/layout/Breadcrumbs';

function ProductsPage() {
  return (
    <div className='mt-5 sm:mt-15'>
      <Container size='xl' className='pt-10'>
        <Breadcrumbs />
      </Container>
      <AllProductsSection />
    </div>
  );
}

export default ProductsPage;
