import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";
import { SECTOR_LINKS } from "../../constants/adminNav";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-[18px] lg:grid-cols-4">
        <StatCard label="Events" value="0" sublabel="0 upcoming" />
        <StatCard label="Team members" value="0" />
        <StatCard label="Collected" value="₱0" sublabel="0 transactions" />
        <StatCard label="Messages" value="0" sublabel="0 unread" sublabelClassName="text-cms-accent" />
      </div>

      <Card className="w-full p-4 sm:p-6">
        <h2 className="mb-4 font-display text-base font-bold text-cms-ink sm:text-lg">Manage your sectors</h2>
        <ul className="divide-y divide-cms-divider">
          {SECTOR_LINKS.map((sector) => (
            <li key={sector.to}>
              <Link to={sector.to} className="flex items-center justify-between gap-3 py-3 transition-colors hover:bg-cms-rowhover sm:py-4">
                <div className="min-w-0">
                  <p className="font-medium text-cms-ink">{sector.name}</p>
                  <p className="mt-0.5 text-sm text-cms-muted">{sector.description}</p>
                </div>
                <span className="shrink-0 text-cms-muted">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
