"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ExternalLink, LogOut, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils/utils";
import initials from "@/lib/utils/initials";
import { cmsMeData } from "@/lib/api/user/user";
import { logout } from "@/lib/api/authAPI/auth";
import { Button } from "@/components/ui/button";
import type { CmsSidebarProps } from "@/lib/types/cmsType";
import { NAV_GROUPS, NAV_ICONS, ICON_PROPS } from "@/lib/constants/cmsNav";
import { USER_PLACEHOLDER, type UserData } from "@/lib/constants/placeholders/userPlaceholder";

export function CmsSidebar({ isOpen = false, onClose = () => {} }: CmsSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [userData, setUserData] = useState<UserData>(USER_PLACEHOLDER);
  const logoutHandler = async () => {
    await logout();
    router.push("/auth/login");
    console.log("Logged out successfully");
  };

  useEffect(() => {
    const validateRole = async () => {
      try {
        const fetchedMeData = await cmsMeData();
        setUserData(fetchedMeData);
      } catch (err) {
        console.error(err instanceof Error ? err.message : err);
      }
    };

    validateRole();
  }, []);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-screen w-[252px] shrink-0 flex-col overflow-hidden bg-cms-ink text-white",
        "transition-transform duration-300 ease-in-out will-change-transform",
        "lg:static lg:z-auto lg:translate-x-0",
        isOpen ? "translate-x-0" : "pointer-events-none -translate-x-full lg:pointer-events-auto",
      )}>
      <div className="flex shrink-0 items-center justify-between gap-3 px-5 pt-6 pb-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-md bg-white font-display text-lg font-bold text-cms-ink">F</div>
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold tracking-tight">F.I.C.S</p>
            <p className="font-mono text-[10px] text-cms-muted2">CMS ADMIN</p>
          </div>
        </div>
        <Button type="button" variant="ghost" size="icon" aria-label="Close navigation menu" onClick={onClose} className="shrink-0 text-[#cfc9bd] hover:bg-white/6 hover:text-white lg:hidden">
          <X size={18} strokeWidth={1.75} aria-hidden="true" />
        </Button>
      </div>

      <nav className="min-h-0 flex-1 space-y-6 overflow-y-auto px-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-wide text-cms-labelfaint">{group.label}</p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = NAV_ICONS[item.to];
                const isActive = pathname === item.to;

                return (
                  <li key={item.to}>
                    <Link
                      href={item.to}
                      onClick={onClose}
                      className={cn("flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors", isActive ? "bg-cms-bg font-semibold text-cms-ink" : "text-[#cfc9bd] hover:bg-white/6")}>
                      {Icon && <Icon {...ICON_PROPS} />}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/10 px-5 py-5">
        <Link href="/" target="_blank" rel="noreferrer" className="mb-4 flex items-center gap-1.5 font-mono text-[11px] text-cms-muted2 transition-colors hover:text-white">
          View live site
          <ExternalLink size={12} strokeWidth={1.75} aria-hidden="true" />
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cms-pillbg2 font-mono text-[10px] font-bold text-cms-ink">
            <span className="text-[15px]">{initials(userData.name)}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">{userData.name}</p>
            <p className="truncate font-mono text-[10px] text-cms-muted2">{userData.role}</p>
          </div>
          <Button type="button" variant="ghost" size="icon-xs" title="Log out" aria-label="Log out" onClick={logoutHandler} className="shrink-0 text-[#cfc9bd] hover:bg-white/6 hover:text-white">
            <LogOut size={16} strokeWidth={1.75} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
