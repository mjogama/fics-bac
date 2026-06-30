export default function StatRow() {
  const stats = [
    { value: "120+", label: "Active members" },
    { value: "30", label: "Events a year" },
    { value: "8", label: "Years on campus" },
  ];

  return (
    <div className="mt-10 flex gap-12">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="font-display text-[30px] font-bold text-cms-ink">{stat.value}</p>
          <p className="mt-1 text-sm text-cms-secondary">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
