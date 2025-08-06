import type { ProductResponse } from '@app/shared';
import { ProductCard } from '@/components/ProductList/ProductCard';

interface ProductListProps {
  products: ProductResponse[];
  onEditProduct: (productId: string) => void;
  loading?: boolean;
}

export function ProductList({
  products,
  onEditProduct,
  loading,
}: ProductListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading products...</span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No products found</div>
        <div className="text-gray-400">
          Try adjusting your filters or add some products.
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEditProduct}
        />
      ))}
    </div>
  );
}
