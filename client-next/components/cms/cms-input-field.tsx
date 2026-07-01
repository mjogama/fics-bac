import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/utils";

const inputClassName =
  "h-auto rounded-cmsinput border-cms-inputborder bg-cms-inputbg px-3 py-2.5 text-sm text-cms-body placeholder:text-cms-placeholder focus-visible:border-cms-inputborder focus-visible:bg-cms-surface focus-visible:ring-0";

type CmsInputFieldProps = {
  label?: string;
  type?: React.ComponentProps<"input">["type"];
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  className?: string;
};

export function CmsInputField({ label, type = "text", name, value, onChange, onBlur, placeholder, required = false, disabled = false, readOnly = false, error, className }: CmsInputFieldProps) {
  return (
    <Field className={className} data-invalid={error ? true : undefined}>
      {label && (
        <FieldLabel htmlFor={name} className="mb-1.5 font-bold text-[10px] uppercase tracking-wide text-cms-labelfaint">
          {label}
        </FieldLabel>
      )}
      <Input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={error ? true : undefined}
        className={cn(
          inputClassName,
          readOnly && "cursor-default focus-visible:bg-cms-inputbg",
          error && "border-destructive focus-visible:border-destructive",
          disabled && "cursor-not-allowed opacity-60",
        )}
      />
      {error ? <FieldError className="mt-1.5 text-xs">{error}</FieldError> : null}
    </Field>
  );
}
