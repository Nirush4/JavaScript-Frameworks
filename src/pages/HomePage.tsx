import BestSellersSection from '../components/layout/BestSellers';
import HeroSection from '../components/layout/HeroSection';
import NewArrivalsSection from '../components/layout/NewArrivals';
import AllProductsSection from '../components/layout/ProductGrid';

function HomePage() {
  return (
    <div>
      <HeroSection />
      <NewArrivalsSection />
      <BestSellersSection />
      <AllProductsSection />
    </div>
  );
}

export default HomePage;
