"use client";

import { useEffect, useState } from "react";

import { CmsSidebar } from "@/components/cms/cms-sidebar";
import { CmsTopBar } from "@/components/cms/cms-top-bar";
import { cn } from "@/lib/utils/utils";

type CmsShellProps = {
  children: React.ReactNode;
};

export function CmsShell({ children }: CmsShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const onDesktop = () => {
      if (mediaQuery.matches) setSidebarOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    mediaQuery.addEventListener("change", onDesktop);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      mediaQuery.removeEventListener("change", onDesktop);
    };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-cms-bg">
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={() => setSidebarOpen(false)}
        className={cn("fixed inset-0 z-40 cursor-pointer bg-cms-ink/50 transition-opacity duration-300 lg:hidden", sidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}
      />

      <CmsSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <CmsTopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="min-h-0 flex-1 overflow-y-auto px-4 pt-5 pb-12 sm:px-6 sm:pt-6 lg:px-8 lg:pt-7 lg:pb-16 scrollbar-hide">{children}</main>
      </div>
    </div>
  );
}
