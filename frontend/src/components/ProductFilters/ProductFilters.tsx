import { useState, useMemo, useEffect } from 'react';
import type { ProductResponse, GetProductsQuery } from '@app/shared';
import { Dropdown } from '@/atoms/Dropdown';
import { Input } from '@/atoms/Input';
import { Checkbox } from '@/atoms/Checkbox';
import { Button, ButtonSizes, ButtonVariants } from '@/atoms/Button';

interface ProductFiltersProps {
  filters: GetProductsQuery;
  onFiltersChange: (filters: GetProductsQuery) => void;
  products: ProductResponse[];
}

export function ProductFilters({
  filters,
  onFiltersChange,
  products,
}: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = useState<GetProductsQuery>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const categoryOptions = useMemo(() => {
    const categories = [
      ...new Set(products.map(product => product.category)),
    ].sort();

    return categories.map(category => ({
      value: category,
      label: category,
    }));
  }, [products]);

  const handleFilterChange = (newFilters: GetProductsQuery) => {
    const cleanedFilters: GetProductsQuery = {};
    if (newFilters.category) cleanedFilters.category = newFilters.category;
    if (newFilters.minPrice !== undefined)
      cleanedFilters.minPrice = newFilters.minPrice;
    if (newFilters.maxPrice !== undefined)
      cleanedFilters.maxPrice = newFilters.maxPrice;
    if (newFilters.availableOnly !== undefined)
      cleanedFilters.availableOnly = newFilters.availableOnly;

    setLocalFilters(cleanedFilters);
    onFiltersChange(cleanedFilters);
  };

  const clearFilters = () => {
    const emptyFilters: GetProductsQuery = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <Button
          onClick={clearFilters}
          variant={ButtonVariants.Primary}
          size={ButtonSizes.Small}
        >
          Clear Filters
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Dropdown
          id="category"
          label="Category"
          options={categoryOptions}
          placeholder="All Categories"
          value={localFilters.category || ''}
          onChange={e => {
            const newFilters = { ...localFilters };
            if (e.target.value) {
              newFilters.category = e.target.value;
            } else {
              delete newFilters.category;
            }
            handleFilterChange(newFilters);
          }}
        />

        <Input
          id="minPrice"
          label="Min Price"
          type="number"
          min="0"
          step="0.01"
          value={localFilters.minPrice || ''}
          onChange={e => {
            const newFilters = { ...localFilters };
            if (e.target.value) {
              newFilters.minPrice = parseFloat(e.target.value);
            } else {
              delete newFilters.minPrice;
            }
            handleFilterChange(newFilters);
          }}
          className="w-32"
          placeholder="0.00"
        />

        <Input
          id="maxPrice"
          label="Max Price"
          type="number"
          min="0"
          step="0.01"
          value={localFilters.maxPrice || ''}
          onChange={e => {
            const newFilters = { ...localFilters };
            if (e.target.value) {
              newFilters.maxPrice = parseFloat(e.target.value);
            } else {
              delete newFilters.maxPrice;
            }
            handleFilterChange(newFilters);
          }}
          className="w-32"
          placeholder="9999.99"
        />

        <Checkbox
          id="availableOnly"
          label="Available Only"
          checked={localFilters.availableOnly || false}
          onChange={e => {
            const newFilters = { ...localFilters };
            if (e.target.checked) {
              newFilters.availableOnly = true;
            } else {
              delete newFilters.availableOnly;
            }
            handleFilterChange(newFilters);
          }}
        />
      </div>
    </div>
  );
}
