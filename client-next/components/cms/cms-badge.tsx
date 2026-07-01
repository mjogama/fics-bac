import { cn } from "@/lib/utils/utils";

const tones = {
  dark: "bg-cms-ink text-white",
  light: "bg-cms-pillbg text-cms-secondary",
  accent: "bg-cms-accent text-white",
};

type CmsBadgeProps = {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
};

export function CmsBadge({ children, tone = "light", className }: CmsBadgeProps) {
  return <span className={cn("inline-flex items-center rounded-cmspill px-2 py-0.5 font-mono text-[12px] font-bold uppercase tracking-wide", tones[tone], className)}>{children}</span>;
}
