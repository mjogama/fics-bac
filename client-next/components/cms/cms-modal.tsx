"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";

const modalActionClassName = "h-10 flex-1 rounded-cmsbtn px-4 text-sm font-medium sm:h-9 sm:flex-none sm:px-5";

type CmsModalActionsProps = {
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
  saveLabel?: string;
};

export function CmsModalActions({ onCancel, onSave, isSaving = false, saveLabel = "Save changes" }: CmsModalActionsProps) {
  return (
    <div className="flex w-full gap-2 sm:w-auto sm:justify-end">
      <Button
        type="button"
        variant="outline"
        disabled={isSaving}
        onClick={onCancel}
        className={cn(modalActionClassName, "border-[1.5px] border-cms-inputborder bg-cms-surface text-cms-ink hover:bg-cms-rowhover")}>
        Cancel
      </Button>
      <Button type="button" disabled={isSaving} onClick={onSave} className={cn(modalActionClassName, "border-[1.5px] border-cms-ink bg-cms-ink text-white hover:bg-cms-body")}>
        {isSaving ? "Saving…" : saveLabel}
      </Button>
    </div>
  );
}

type CmsModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  footer?: ReactNode;
  fitContent?: boolean;
  panelClassName?: string;
  contentClassName?: string;
};

export function CmsModal({ open, onClose, title, eyebrow, children, footer, fitContent = false, panelClassName, contentClassName }: CmsModalProps) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button type="button" className="absolute inset-0 cursor-pointer bg-cms-ink/40" aria-label="Close modal" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cms-modal-title"
        className={cn(
          "relative z-10 flex w-full max-w-[520px] flex-col overflow-hidden rounded-t-cmscard border border-cms-cardborder bg-cms-surface sm:rounded-cmscard",
          fitContent ? "h-auto" : "max-h-[92dvh] sm:max-h-[min(92dvh,720px)]",
          panelClassName,
        )}>
        <div className="flex shrink-0 items-start justify-between border-b border-cms-divider px-4 py-4 sm:px-6">
          <div>
            {eyebrow ? <p className="font-mono text-[10px] uppercase tracking-wide text-cms-labelfaint">{eyebrow}</p> : null}
            <h2 id="cms-modal-title" className="font-display text-lg font-bold text-cms-ink">
              {title}
            </h2>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="cursor-pointer rounded-cmsbtn p-1 text-cms-muted transition-colors hover:bg-cms-rowhover hover:text-cms-ink">
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        <div className={cn("px-4 py-4 sm:px-6 sm:py-5", fitContent ? "shrink-0" : "min-h-0 flex-1 overflow-y-auto scrollbar-hide", contentClassName)}>{children}</div>

        {footer ? <div className="shrink-0 border-t border-cms-divider px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:px-6 sm:py-4">{footer}</div> : null}
      </div>
    </div>
  );
}
