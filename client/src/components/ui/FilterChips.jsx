export default function Chip({ label, active, onClick, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-cmspill border-[1.5px] border-cms-ink bg-cms-ink px-3 py-1.5 font-mono text-xs text-white"
          : "rounded-cmspill border-[1.5px] border-cms-inputborder bg-cms-surface px-3 py-1.5 font-mono text-xs text-cms-muted hover:bg-cms-rowhover"
      }>
      {label}
      {count !== undefined && <span className={active ? "ml-1.5 opacity-70" : "ml-1.5 text-cms-muted2"}>{count}</span>}
    </button>
  );
}

export function FilterChips({ options, active, onChange, counts = {} }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Chip key={option} label={option} active={active === option} onClick={() => onChange(option)} count={counts[option]} />
      ))}
    </div>
  );
}
