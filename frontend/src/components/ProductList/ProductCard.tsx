import type { ProductResponse } from '@app/shared';
import { Button, ButtonVariants } from '@/atoms/Button';

interface ProductCardProps {
  product: ProductResponse;
  onEdit: (productId: string) => void;
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
  const isAvailable = product.quantity > 0;
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString();

  const handleEditClick = () => {
    onEdit(product.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 h-full flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 capitalize">
              {product.category}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </div>
          </div>
        </div>

        <p className="shrink-0 text-gray-600 text-sm line-clamp-3">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-sm text-gray-500">Quantity:</span>
            <span className="ml-1 font-medium text-gray-900">
              {product.quantity}
            </span>
          </div>
          <div>
            {isAvailable ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Available
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        <div className="h-full text-xs text-gray-400">
          <div>Created: {formatDate(product.createdAt)}</div>
          {product.updatedAt !== product.createdAt && (
            <div>Updated: {formatDate(product.updatedAt)}</div>
          )}
        </div>

        <div className="flex flex-col justify-end">
          <Button
            variant={ButtonVariants.Outline}
            className="w-full"
            onClick={handleEditClick}
          >
            View/Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
