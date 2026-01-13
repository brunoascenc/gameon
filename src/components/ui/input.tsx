import * as React from "react";

import { cn } from "@/lib/utils";
import { Field, FieldError, FieldLabel } from "./field";
import { FieldError as FieldErrorType } from "react-hook-form";
import { Spinner } from "./spinner";
import { Check, SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "@/hooks/use-debounce-callback";

function Input({
  className,
  label,
  id,
  errors,
  type,
  loading,
  approved,
  search,
  searchFunction,
  ...props
}: React.ComponentProps<"input"> & {
  errors?: FieldErrorType;
  label?: React.ReactNode;
  loading?: boolean;
  approved?: boolean;
  search?: boolean;
  searchFunction?: (value: string) => void;
}) {
  const { debounced } = useDebouncedCallback((value: string) => {
    searchFunction?.(value);
  }, 400);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e);
    debounced(e.target.value);
  };

  return (
    <Field className="gap-2">
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <div className="relative">
        <input
          type={type}
          data-slot="input"
          id={id}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
          onChange={handleChange}
        />
        {errors && <FieldError errors={[errors]} />}
        {loading && <Spinner className="absolute right-2 top-[10px]" />}
        {(search && !loading) && <SearchIcon className="text-muted-foreground size-4 absolute right-2 top-[10px]" />}
        {approved && (
          <Check
            size={18}
            className="text-green-600 absolute right-2 top-[10px]"
          />
        )}
      </div>
    </Field>
  );
}

export { Input };
