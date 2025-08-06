import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductForm } from '@/components/ProductForm';
import { ProductApiClient } from '@/api/ProductApiClient.ts';
import type {
  CreateProductBody,
  ProductResponse,
  UpdateProductBody,
} from '@app/shared';
import { productParamsSchema } from '@app/shared';
import { AppRoutes } from '@/AppRoutes';
import { Button, ButtonVariants } from '@/atoms/Button';
import { Header } from '@/components/Header';

export default function ProductEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // Validate the ID parameter using the schema
      const result = productParamsSchema.safeParse({ id });
      if (!result.success) {
        setError('Invalid product ID provided');
        return;
      }
      loadProduct(id);
    } else {
      setError('No product ID provided');
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedProduct = await ProductApiClient.getProductById(productId);
      setProduct(fetchedProduct);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load product');
      console.error('Error loading product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (
    productData: CreateProductBody | UpdateProductBody
  ) => {
    if (!product || !id) return;

    setFormLoading(true);
    try {
      await ProductApiClient.updateProduct(
        id,
        productData as UpdateProductBody
      );
      navigate(AppRoutes.Products);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update product');
      console.error('Error updating product:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!product || !id) return;

    if (
      !confirm(
        'Are you sure you want to delete this product? This action cannot be undone.'
      )
    ) {
      return;
    }

    try {
      await ProductApiClient.deleteProduct(id);
      navigate(AppRoutes.Products);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete product');
      console.error('Error deleting product:', err);
    }
  };

  const handleCancel = () => {
    navigate(AppRoutes.Products);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading product...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-8 flex flex-col gap-6">
        <Header
          title="Product Not Found"
          showBackButton={true}
          onBackClick={handleCancel}
        />
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="text-red-800">
            {error ||
              'We couldn’t find that product. It might have been removed or the link may be incorrect.'}
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 flex flex-col gap-6">
      <Header
        title="Edit Product"
        description="Update the product information below"
        showBackButton={true}
        onBackClick={handleCancel}
        actions={
          <Button
            onClick={handleDeleteProduct}
            variant={ButtonVariants.Destructive}
          >
            Delete Product
          </Button>
        }
      />

      <ProductForm
        product={product}
        onSubmit={handleUpdateProduct}
        onCancel={handleCancel}
        loading={formLoading}
      />
    </div>
  );
}
