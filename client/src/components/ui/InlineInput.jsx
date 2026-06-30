import { inlineFieldClassName } from "../../utils/inlineFieldClasses";

export default function InlineInput({ value, onChange, mono = false, className = "", placeholder = "", bare = false, active = false, id, inputRef, ...rest }) {
  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      {...(value !== undefined ? { value } : {})}
      placeholder={placeholder}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      className={`w-full rounded-cmsinput px-2 py-1.5 text-cms-body placeholder:text-cms-placeholder ${inlineFieldClassName({ bare, active, className })} ${mono ? "font-mono text-sm" : "font-body text-sm"}`}
      {...rest}
    />
  );
}
