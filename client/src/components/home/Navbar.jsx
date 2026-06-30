import Button from "../ui/Button";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Our Team", href: "#team" },
  { label: "Membership", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-[26px]">
      <a href="#" className="flex items-center gap-3 no-underline">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cms-ink">
          <span className="font-display text-[22px] font-extrabold text-white">F</span>
        </div>
        <span className="font-display text-[22px] font-bold text-cms-ink">F.I.C.S</span>
      </a>

      <div className="flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} className="text-[16px] text-cms-secondary no-underline transition-colors hover:text-cms-ink">
            {link.label}
          </a>
        ))}
        <Button href="#contact" variant="primary" size="md">
          Contact
        </Button>
      </div>
    </nav>
  );
}
