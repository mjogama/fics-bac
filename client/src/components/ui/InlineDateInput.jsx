import { toIsoDate } from "../../utils/date";
import { inlineFieldClassName } from "../../utils/inlineFieldClasses";

export default function InlineDateInput({ value, onChange, className = "", bare = false, active = false, ...rest }) {
  return (
    <input
      type="date"
      {...(value !== undefined ? { value: toIsoDate(value) } : {})}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      className={`w-full rounded-cmsinput px-2 py-1.5 font-mono text-sm text-cms-body [&::-webkit-calendar-picker-indicator]:cursor-pointer ${inlineFieldClassName({ bare, active, className })}`}
      {...rest}
    />
  );
}
