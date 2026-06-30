const EXPLORE_LINKS = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Our Team", href: "#team" },
  { label: "Membership", href: "#contact" },
];

export default function Footer() {
  return (
    <footer id="contact" className="mt-16 border-t border-[#ddd7cd] bg-[#ece8e1]">
      <div className="mx-auto max-w-home px-8">
        <div className="grid grid-cols-[1.8fr_1fr_1fr] gap-10 py-14">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cms-ink">
                <span className="font-display text-[22px] font-extrabold text-white">F</span>
              </div>
              <span className="font-display text-[22px] font-bold text-cms-ink">F.I.C.S</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cms-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.</p>
          </div>

          <div>
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-wide text-cms-labelfaint">Explore</p>
            <ul className="space-y-2">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-cms-secondary no-underline transition-colors hover:text-cms-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-wide text-cms-labelfaint">Contact</p>
            <ul className="space-y-2 text-sm text-cms-secondary">
              <li>lorem@example.com</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#ddd7cd] py-5 text-sm text-cms-muted">
          <span>© 2026 F.I.C.S</span>
          <span className="font-mono text-[11px]">// built with curiosity</span>
        </div>
      </div>
    </footer>
  );
}
