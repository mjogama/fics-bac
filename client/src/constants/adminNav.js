export const EVENT_STATUSES = ["upcoming", "ongoing", "completed", "postponed", "cancelled"];

export const CONCERN_TYPES = ["General Inquiry", "Membership", "Events", "Website", "Suggestion", "Complaint", "Other"];

export const BRANCHES = ["Executive Council", "Executive Coordinators", "Advisory Council", "Faculty Advisers"];

export const VIEW_META = {
  "/admin/dashboard": {
    title: "Dashboard",
    crumb: "Overview",
    addLabel: "New content",
  },
  "/admin/about": {
    title: "About",
    crumb: "Content / About",
    hideAddButton: true,
  },
  "/admin/events": {
    title: "Events",
    crumb: "Content / Events",
    addLabel: "New event",
    hideAddButton: true,
  },
  "/admin/team": {
    title: "Our Team",
    crumb: "Content / Team",
    addLabel: "New member",
  },
  "/admin/membership": {
    title: "Membership",
    crumb: "Content / Membership",
    addLabel: "New entry",
  },
  "/admin/contact": {
    title: "Contact",
    crumb: "Content / Contact",
    addLabel: "New FAQ",
  },
};

export const NAV_GROUPS = [
  {
    label: "OVERVIEW",
    items: [{ to: "/admin/dashboard", label: "Dashboard" }],
  },
  {
    label: "CONTENT SECTORS",
    items: [
      { to: "/admin/about", label: "About" },
      { to: "/admin/events", label: "Events", countKey: "events" },
      { to: "/admin/team", label: "Our Team", countKey: "team" },
      { to: "/admin/membership", label: "Membership" },
      { to: "/admin/contact", label: "Contact", countKey: "unread" },
    ],
  },
];

export const SECTOR_LINKS = [
  {
    to: "/admin/about",
    name: "About",
    description: "Headline, mission, and vision",
  },
  {
    to: "/admin/events",
    name: "Events",
    description: "Workshops, hackathons, and tech talks",
  },
  {
    to: "/admin/team",
    name: "Our Team",
    description: "Council members and branch assignments",
  },
  {
    to: "/admin/membership",
    name: "Membership",
    description: "Dues ledger and income tracking",
  },
  {
    to: "/admin/contact",
    name: "Contact",
    description: "Inbox messages and contact info",
  },
];
