const tones = {
  dark: "bg-cms-ink text-white",
  light: "bg-cms-pillbg text-cms-secondary",
  accent: "bg-cms-accent text-white",
};

export default function Badge({ children, tone = "light", className = "" }) {
  return <span className={`inline-flex items-center rounded-cmspill px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide ${tones[tone]} ${className}`}>{children}</span>;
}
