import StatCard from "../../components/ui/StatCard";

export default function Membership() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-[18px] lg:grid-cols-[1.3fr_1fr_1fr]">
        <StatCard dark label="Total collected" value="₱0" />
        <StatCard label="Dues per member" value="₱150" sublabel="Per semester" />
        <StatCard label="Income entries" value="0" sublabel="0 expenses logged" />
      </div>
      <p className="text-sm text-cms-muted">No transactions yet.</p>
    </div>
  );
}
