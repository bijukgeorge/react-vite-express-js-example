import React from 'react';
import { clsx } from 'clsx';
import type { DropdownOption } from '@/atoms/Dropdown/DropdownOption.tsx';

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: DropdownOption[];
  placeholder?: string;
  error?: string;
}

export function Dropdown({
  label,
  options,
  placeholder = 'Select an option',
  error,
  className,
  id,
  ...props
}: DropdownProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        className={clsx(
          // Base styles
          'px-3 py-2 border border-gray-300 rounded-md',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'text-gray-700 bg-white',
          'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
          'transition-colors duration-200',

          // Error styles
          {
            'border-red-300 focus:ring-red-500': error,
          },

          className
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-600 mt-1">{error}</span>}
    </div>
  );
}
