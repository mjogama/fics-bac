export default function Eyebrow({ children, className = "" }) {
  return <p className={`mb-4 inline-block rounded-cmspill bg-cms-pillbg px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-cms-muted ${className}`}>// {children}</p>;
}
