import Card from "./Card";

export default function StatCard({ label, value, sublabel, sublabelClassName = "text-cms-muted", onClick, dark = false, className = "" }) {
  const content = (
    <>
      <p className={`font-mono text-[10px] uppercase tracking-wide ${dark ? "text-cms-muted2" : "text-cms-labelfaint"}`}>{label}</p>
      <p className={`mt-2 font-display text-2xl font-bold leading-none sm:text-[28px] ${dark ? "text-white" : "text-cms-ink"}`}>{value}</p>
      {sublabel && <p className={`mt-2 font-mono text-xs ${sublabelClassName}`}>{sublabel}</p>}
    </>
  );

  if (dark) {
    return (
      <Card className={`border-cms-ink bg-cms-ink p-4 sm:p-5 ${onClick ? "cursor-pointer hover:opacity-95" : ""} ${className}`} onClick={onClick}>
        {content}
      </Card>
    );
  }

  return (
    <Card className={`p-4 sm:p-5 ${onClick ? "cursor-pointer hover:bg-cms-rowhover" : ""} ${className}`} onClick={onClick}>
      {content}
    </Card>
  );
}
