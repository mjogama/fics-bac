"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { VIEW_META } from "@/lib/constants/cmsNav";

type CmsTopBarProps = {
  onMenuClick?: () => void;
};

export function CmsTopBar({ onMenuClick = () => {} }: CmsTopBarProps) {
  const pathname = usePathname();
  const meta = VIEW_META[pathname] ?? VIEW_META["/cms/dashboard"];

  return (
    <header className="sticky top-0 z-30 border-b border-cms-inputborder bg-cms-bg/90 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Open navigation menu"
            onClick={onMenuClick}
            className="shrink-0 rounded-cmsbtn border-cms-inputborder bg-cms-surface text-cms-ink hover:bg-cms-rowhover lg:hidden">
            <Menu size={18} strokeWidth={1.75} aria-hidden="true" />
          </Button>
          <div className="min-w-0">
            <p className="truncate font-mono text-[10px] uppercase tracking-wide text-cms-labelfaint">{meta.crumb}</p>
            <h1 className="truncate font-display text-lg font-bold text-cms-ink sm:text-xl">{meta.title}</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
