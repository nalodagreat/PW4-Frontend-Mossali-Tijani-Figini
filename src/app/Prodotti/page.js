import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';
function ProductPage() {
  return (
    <div>
      <ProductGrid>
        {/* puoi mappare una lista di prodotti qui */}
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </ProductGrid>
    </div>
  );
}

export default ProductPage;
