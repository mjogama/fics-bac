import { Calendar, CreditCard, Info, LayoutDashboard, Mail, Users } from "lucide-react";

export const VIEW_META: Record<string, { title: string; crumb: string; addLabel?: string; hideAddButton?: boolean }> = {
  "/cms/dashboard": {
    title: "Dashboard",
    crumb: "Overview",
    addLabel: "New content",
  },
  "/cms/about": {
    title: "About",
    crumb: "Content / About",
    hideAddButton: true,
  },
  "/cms/events": {
    title: "Events",
    crumb: "Content / Events",
    addLabel: "New event",
    hideAddButton: true,
  },
  "/cms/our-team": {
    title: "Our Team",
    crumb: "Content / Team",
    addLabel: "New member",
  },
  "/cms/membership": {
    title: "Membership",
    crumb: "Content / Membership",
    addLabel: "New entry",
  },
  "/cms/contact": {
    title: "Contact",
    crumb: "Content / Contact",
    addLabel: "New FAQ",
  },
};

export const NAV_GROUPS = [
  {
    label: "OVERVIEW",
    items: [{ to: "/cms/dashboard", label: "Dashboard" }],
  },
  {
    label: "CONTENT SECTORS",
    items: [
      { to: "/cms/about", label: "About" },
      { to: "/cms/events", label: "Events", countKey: "events" },
      { to: "/cms/our-team", label: "Our Team", countKey: "team" },
      { to: "/cms/membership", label: "Membership" },
      { to: "/cms/contact", label: "Contact", countKey: "unread" },
    ],
  },
] as const;

export const NAV_ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; "aria-hidden"?: boolean }>> = {
  "/cms/dashboard": LayoutDashboard,
  "/cms/about": Info,
  "/cms/events": Calendar,
  "/cms/our-team": Users,
  "/cms/membership": CreditCard,
  "/cms/contact": Mail,
};

export const ICON_PROPS = { size: 16, strokeWidth: 1.75, "aria-hidden": true as const };

export const SECTOR_LINKS = [
  {
    to: "/cms/about",
    name: "About",
    description: "Headline, mission, and vision",
  },
  {
    to: "/cms/events",
    name: "Events",
    description: "Workshops, hackathons, and tech talks",
  },
  {
    to: "/cms/our-team",
    name: "Our Team",
    description: "Council members and branch assignments",
  },
  {
    to: "/cms/membership",
    name: "Membership",
    description: "Dues ledger and income tracking",
  },
  {
    to: "/cms/contact",
    name: "Contact",
    description: "Inbox messages and contact info",
  },
] as const;
