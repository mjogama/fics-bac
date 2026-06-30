const STATUS_STYLES = {
  upcoming: {
    label: "Upcoming",
    className: "border-cms-incomeborder bg-cms-incomebg text-cms-incometext",
  },
  ongoing: {
    label: "Ongoing",
    className: "border-[#b8cce8] bg-[#e8f0fa] text-[#1e4a7a]",
  },
  completed: {
    label: "Completed",
    className: "border-cms-inputborder bg-cms-pillbg text-cms-muted",
  },
  postponed: {
    label: "Postponed",
    className: "border-[#e8d48b] bg-[#faf3d4] text-[#7a5c00]",
  },
  cancelled: {
    label: "Cancelled",
    className: "border-cms-deleteborder bg-[#fce8e4] text-cms-accent",
  },
};

export default function StatusSelect({ value, onChange, options, active = false, className = "", disabled = false, ...rest }) {
  const variant = STATUS_STYLES[value ?? "upcoming"] ?? STATUS_STYLES.completed;

  return (
    <select
      {...(value !== undefined ? { value } : {})}
      disabled={disabled}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      className={`w-[80px] max-w-[80px] cursor-pointer appearance-none truncate rounded-cmsinput border-[1.5px] px-1 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide outline-none transition-colors disabled:cursor-default disabled:opacity-100 ${active ? "ring-2 ring-cms-inputborder" : ""} ${variant.className} ${className}`}
      {...rest}>
      {options.map((option) => (
        <option key={option} value={option}>
          {STATUS_STYLES[option]?.label ?? option}
        </option>
      ))}
    </select>
  );
}
