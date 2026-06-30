export default function InputField({ label, type = "text", name, value, onChange, placeholder, required = false, disabled = false, className = "" }) {
  return (
    <label htmlFor={name} className={`block ${className}`}>
      {label && <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-wide text-cms-labelfaint">{label}</span>}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full rounded-cmsinput border border-cms-inputborder bg-cms-inputbg px-3 py-2.5 text-sm text-cms-body placeholder:text-cms-placeholder outline-none transition-colors focus:border-cms-inputborder focus:bg-cms-surface disabled:cursor-not-allowed disabled:opacity-60"
      />
    </label>
  );
}
