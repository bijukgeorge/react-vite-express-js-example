import { useState, useEffect } from 'react';
import type {
  ProductResponse,
  CreateProductBody,
  UpdateProductBody,
} from '@app/shared';
import { createProductSchema, updateProductSchema } from '@app/shared';
import { Input } from '@/atoms/Input';
import { Button, ButtonVariants } from '@/atoms/Button';
import { Textarea } from '@/atoms/Textarea';
import { useFormValidation } from '@/hooks/useFormValidation';

interface ProductFormProps {
  product?: ProductResponse;
  onSubmit: (
    productData: CreateProductBody | UpdateProductBody
  ) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export function ProductForm({
  product,
  onSubmit,
  onCancel,
  loading,
}: ProductFormProps) {
  const isEditMode = !!product;
  const schema = isEditMode ? updateProductSchema : createProductSchema;
  const { errors, validate, clearFieldError } = useFormValidation(schema);

  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price?.toString() || '',
    quantity: product?.quantity?.toString() || '',
    category: product?.category || '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        quantity: product.quantity.toString(),
        category: product.category,
      });
    }
  }, [product]);

  const validateForm = (): boolean => {
    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category.trim(),
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    };

    return validate(productData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category.trim(),
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    };

    try {
      await onSubmit(productData);
    } catch (error) {
      console.error('Failed to submit product:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      clearFieldError(field);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </h2>
        <p className="text-gray-600 mt-1">
          {isEditMode
            ? 'Update the product information below.'
            : 'Fill in the details to create a new product.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="name"
          label="Product Name *"
          type="text"
          value={formData.name}
          onChange={e => handleInputChange('name', e.target.value)}
          className="w-full"
          placeholder="Enter product name"
          disabled={loading}
          {...(errors['name'] && { error: errors['name'] })}
        />

        <Input
          id="category"
          label="Category *"
          type="text"
          value={formData.category}
          onChange={e => handleInputChange('category', e.target.value)}
          className="w-full"
          placeholder="e.g. Electronics, Clothing, Books"
          disabled={loading}
          {...(errors['category'] && { error: errors['category'] })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="price"
            label="Price * ($)"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={e => handleInputChange('price', e.target.value)}
            className="w-full"
            placeholder="0.00"
            disabled={loading}
            {...(errors['price'] && { error: errors['price'] })}
          />

          <Input
            id="quantity"
            label="Quantity *"
            type="number"
            min="0"
            step="1"
            value={formData.quantity}
            onChange={e => handleInputChange('quantity', e.target.value)}
            className="w-full"
            placeholder="0"
            disabled={loading}
            {...(errors['quantity'] && { error: errors['quantity'] })}
          />
        </div>

        <Textarea
          id="description"
          label="Description *"
          rows={4}
          value={formData.description}
          onChange={e => handleInputChange('description', e.target.value)}
          className="w-full"
          placeholder="Enter a detailed description of the product"
          disabled={loading}
          {...(errors['description'] && { error: errors['description'] })}
        />

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isEditMode ? 'Updating...' : 'Creating...'}
              </div>
            ) : isEditMode ? (
              'Update Product'
            ) : (
              'Create Product'
            )}
          </Button>
          <Button
            type="button"
            variant={ButtonVariants.Secondary}
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
