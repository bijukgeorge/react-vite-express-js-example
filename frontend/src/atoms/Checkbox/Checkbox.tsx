import React from 'react';
import { clsx } from 'clsx';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Checkbox({
  label,
  error,
  className,
  id,
  ...props
}: CheckboxProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <input
          id={id}
          type="checkbox"
          className={clsx(
            // Base styles
            'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors duration-200',

            // Error styles
            {
              'border-red-300 focus:ring-red-500': error,
            },

            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className="ml-2 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
      </div>
      {error && <span className="text-sm text-red-600 mt-1">{error}</span>}
    </div>
  );
}
