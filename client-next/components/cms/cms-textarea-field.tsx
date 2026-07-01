import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils/utils";

const textareaClassName =
  "h-auto rounded-cmsinput border-cms-inputborder bg-cms-inputbg px-3 py-2.5 text-sm leading-relaxed text-cms-body placeholder:text-cms-placeholder focus-visible:border-cms-inputborder focus-visible:bg-cms-surface focus-visible:ring-0";

type CmsTextareaFieldProps = {
  label?: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  className?: string;
};

export function CmsTextareaField({ label, name, value, onChange, placeholder, required = false, disabled = false, readOnly = false, rows = 4, className }: CmsTextareaFieldProps) {
  return (
    <Field className={className}>
      {label && (
        <FieldLabel htmlFor={name} className="font-bold mb-1.5 text-[10px] uppercase tracking-wide text-cms-labelfaint text-justify">
          {label}
        </FieldLabel>
      )}
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        className={cn(textareaClassName, readOnly && "cursor-default focus-visible:bg-cms-inputbg", disabled && "cursor-not-allowed opacity-60")}
      />
    </Field>
  );
}
