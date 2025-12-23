import { useCallback, useEffect, useState } from "react";
import type { FieldValues, UseFormWatch } from "react-hook-form";

type FormErrorState = {
  show: boolean;
  description: string;
};

const emptyError: FormErrorState = { show: false, description: "" };

export function useFormError<TFieldValues extends FieldValues>(
  watch: UseFormWatch<TFieldValues>
) {
  const [error, setError] = useState<FormErrorState>(emptyError);

  const showError = useCallback((description: string) => {
    setError({ show: true, description });
  }, []);

  const clearError = useCallback(() => {
    setError(emptyError);
  }, []);

  useEffect(() => {
    const subscription = watch(() => {
      setError((current) => (current.show ? emptyError : current));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return { error, showError, clearError, setError };
}
