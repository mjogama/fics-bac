export default function InlineTextarea({ value, onChange, className = "", rows = 4, placeholder = "", ...rest }) {
  return (
    <textarea
      {...(value !== undefined ? { value } : {})}
      rows={rows}
      placeholder={placeholder}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      className={`w-full resize-none rounded-cmsinput border border-cms-inputborder/60 bg-cms-inputbg px-2 py-1.5 font-body text-sm text-cms-body outline-none transition-colors placeholder:text-cms-placeholder focus:border-cms-inputborder focus:bg-cms-surface ${className}`}
      {...rest}
    />
  );
}
