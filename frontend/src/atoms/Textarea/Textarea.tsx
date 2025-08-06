import React from 'react';
import { clsx } from 'clsx';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
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
      />
      {error && <span className="text-sm text-red-600 mt-1">{error}</span>}
    </div>
  );
}
