import { MILITARY_TIMES } from "../../constants/time";
import { inlineFieldClassName } from "../../utils/inlineFieldClasses";

export default function TimeSelect({ value, onChange, options = MILITARY_TIMES, bare = false, active = false, className = "", disabled = false, ...rest }) {
  const selected = value !== undefined && options.includes(value) ? value : "";

  return (
    <select
      {...(value !== undefined ? { value: selected } : {})}
      disabled={disabled}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      className={`w-full cursor-pointer appearance-none rounded-cmsinput px-2 py-1.5 font-mono text-sm text-cms-body disabled:cursor-default disabled:opacity-100 ${inlineFieldClassName({ bare, active })} ${className}`}
      {...rest}>
      <option value="">—</option>
      {options.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
}
