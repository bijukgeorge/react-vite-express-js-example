import React from 'react';
import { clsx } from 'clsx';
import { ButtonVariants } from '@/atoms/Button/ButtonVariants.ts';
import { ButtonSizes } from '@/atoms/Button/ButtonSizes.ts';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  children: React.ReactNode;
}

export function Button({
  variant = ButtonVariants.Primary,
  size = ButtonSizes.Default,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:shadow-none',
        'active:scale-95',

        // Variants
        {
          'bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md disabled:bg-blue-300 disabled:text-blue-100':
            variant === ButtonVariants.Primary,
          'border-2 border-blue-600 bg-transparent text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white hover:shadow-md disabled:border-blue-300 disabled:text-blue-300 disabled:bg-transparent':
            variant === ButtonVariants.Outline,
          'border-2 border-transparent text-gray-300 hover:text-white hover:bg-gray-700':
            variant === ButtonVariants.Secondary,
          'bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md disabled:bg-red-300 disabled:text-red-100':
            variant === ButtonVariants.Destructive,
        },

        // Sizes
        {
          'h-10 px-4 py-2 text-sm': size === ButtonSizes.Default,
          'h-8 px-3 py-1 text-xs': size === ButtonSizes.Small,
          'h-12 px-8 py-3 text-base': size === ButtonSizes.Large,
        },

        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
