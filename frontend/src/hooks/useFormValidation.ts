import { useState, useCallback } from 'react';
import { z } from 'zod';

interface ValidationErrors {
  [key: string]: string;
}

interface UseFormValidationResult<T> {
  errors: ValidationErrors;
  validate: (data: unknown) => data is T;
  clearErrors: () => void;
  clearFieldError: (fieldName: string) => void;
}

export function useFormValidation<T>(
  schema: z.ZodSchema<T>
): UseFormValidationResult<T> {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = useCallback(
    (data: unknown): data is T => {
      const result = schema.safeParse(data);

      if (!result.success) {
        const newErrors: ValidationErrors = {};
        result.error.issues.forEach(issue => {
          const fieldName = issue.path.join('.');
          newErrors[fieldName] = issue.message;
        });
        setErrors(newErrors);
        return false;
      }

      setErrors({});
      return true;
    },
    [schema]
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  return {
    errors,
    validate,
    clearErrors,
    clearFieldError,
  };
}
