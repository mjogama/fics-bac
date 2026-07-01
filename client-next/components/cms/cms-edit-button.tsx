import { SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";

type CmsEditButtonProps = {
  label?: string;
  "aria-label": string;
  onClick?: () => void;
  className?: string;
};

export function CmsEditButton({ label, "aria-label": ariaLabel, onClick, className }: CmsEditButtonProps) {
  const iconOnly = !label;

  return (
    <Button
      type="button"
      variant="secondary"
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn("shrink-0 text-cms-muted2 transition-colors hover:text-cms-accent", iconOnly ? "size-9" : "h-9 gap-1.5 px-3 text-sm", className)}>
      {label}
      <SquarePen className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
    </Button>
  );
}
