import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductForm } from '@/components/ProductForm';
import { ProductApiClient } from '@/api/ProductApiClient.ts';
import type { CreateProductBody, UpdateProductBody } from '@app/shared';
import { AppRoutes } from '@/AppRoutes';
import { Header } from '@/components/Header';

export default function ProductAddPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateProduct = async (productData: CreateProductBody) => {
    setLoading(true);
    try {
      await ProductApiClient.createProduct(productData);
      navigate(AppRoutes.Products);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create product');
      console.error('Error creating product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(AppRoutes.Products);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 flex flex-col gap-6">
      <Header
        title="Add New Product"
        description="Fill in the details to create a new product"
        showBackButton={true}
        onBackClick={handleCancel}
      />

      <ProductForm
        onSubmit={
          handleCreateProduct as (
            productData: CreateProductBody | UpdateProductBody
          ) => Promise<void>
        }
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
}
