import React from 'react';
import { Button, ButtonVariants } from '@/atoms/Button';

interface HeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  actions?: React.ReactNode;
}

export function Header({
  title,
  description,
  showBackButton = false,
  onBackClick,
  actions,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {showBackButton && onBackClick && (
          <Button onClick={onBackClick} variant={ButtonVariants.Secondary}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-200">{title}</h1>
          {description && <p className="text-gray-400 mt-1">{description}</p>}
        </div>
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
}
