import { Link, NavLink, useNavigate } from "react-router-dom";
import { Calendar, CreditCard, ExternalLink, Info, LayoutDashboard, LogOut, Mail, Users, X } from "lucide-react";

import { paths } from "../../constants/paths";
import { NAV_GROUPS } from "../../constants/adminNav";

const iconProps = { size: 16, strokeWidth: 1.75, "aria-hidden": true };

const NAV_ICONS = {
  "/admin/dashboard": LayoutDashboard,
  "/admin/about": Info,
  "/admin/events": Calendar,
  "/admin/team": Users,
  "/admin/membership": CreditCard,
  "/admin/contact": Mail,
};

const PLACEHOLDER_USER = {
  name: "Admin User",
  role: "Admin",
};

function initials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function AdminSidebar({ isOpen = false, onClose = () => {} }) {
  const navigate = useNavigate();

  return (
    <aside
      className={[
        "fixed inset-y-0 left-0 z-50 flex h-screen w-[252px] shrink-0 flex-col overflow-y-auto bg-cms-ink text-white",
        "transition-transform duration-300 ease-in-out will-change-transform",
        "lg:static lg:z-auto lg:translate-x-0",
        isOpen ? "translate-x-0" : "pointer-events-none -translate-x-full lg:pointer-events-auto",
      ].join(" ")}>
      <div className="flex items-center justify-between gap-3 px-5 pt-6 pb-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-md bg-white font-display text-lg font-bold text-cms-ink">F</div>
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold tracking-tight">F.I.C.S</p>
            <p className="font-mono text-[10px] text-cms-muted2">CMS ADMIN</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="flex shrink-0 items-center justify-center rounded-lg p-2 text-[#cfc9bd] transition-colors hover:bg-white/6 hover:text-white lg:hidden">
          <X size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <nav className="flex-1 space-y-6 px-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-wide text-cms-labelfaint">{group.label}</p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = NAV_ICONS[item.to];

                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2.5 rounded-lg bg-cms-bg px-3 py-2 text-sm font-semibold text-cms-ink"
                          : "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#cfc9bd] hover:bg-white/[0.06]"
                      }>
                      {Icon && <Icon {...iconProps} />}
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-5 py-5">
        <Link to="/" target="_blank" rel="noreferrer" className="mb-4 flex items-center gap-1.5 font-mono text-[11px] text-cms-muted2 hover:text-white">
          View live site
          <ExternalLink size={12} strokeWidth={1.75} aria-hidden="true" />
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cms-pillbg2 font-mono text-[10px] font-bold text-cms-ink">
            <span className="text-[15px]">{initials(PLACEHOLDER_USER.name)}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">{PLACEHOLDER_USER.name}</p>
            <p className="truncate font-mono text-[10px] text-cms-muted2">{PLACEHOLDER_USER.role}</p>
          </div>
          <button
            onClick={() => navigate(paths.login)}
            type="button"
            title="Log out"
            aria-label="Log out"
            className="flex shrink-0 items-center justify-center rounded-lg p-2 text-[#cfc9bd] transition-colors hover:bg-white/6 hover:text-white">
            <LogOut size={16} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
}
