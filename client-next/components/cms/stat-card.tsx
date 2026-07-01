import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/utils";

type StatCardProps = {
  label: string;
  value: string;
  sublabel?: string;
  sublabelClassName?: string;
  dark?: boolean;
  className?: string;
  onClick?: () => void;
};

export function StatCard({ label, value, sublabel, sublabelClassName = "text-cms-muted", dark = false, className, onClick }: StatCardProps) {
  return (
    <Card
      className={cn(
        "rounded-cmscard border-cms-cardborder bg-cms-surface py-0 ring-0",
        dark && "border-cms-ink bg-cms-ink",
        onClick && (dark ? "cursor-pointer hover:opacity-95" : "cursor-pointer hover:bg-cms-rowhover"),
        className,
      )}
      onClick={onClick}>
      <CardContent className="p-4 sm:p-5">
        <p className={cn("font-mono text-[10px] uppercase tracking-wide", dark ? "text-cms-muted2" : "text-cms-labelfaint")}>{label}</p>
        <p className={cn("mt-2 font-display text-2xl leading-none font-bold sm:text-[28px]", dark ? "text-white" : "text-cms-ink")}>{value}</p>
        {sublabel && <p className={cn("mt-2 font-mono text-xs", sublabelClassName)}>{sublabel}</p>}
      </CardContent>
    </Card>
  );
}
