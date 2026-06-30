const AVATAR_COLORS = ["bg-cms-ink", "bg-cms-secondary", "bg-cms-muted2", "bg-cms-accent"];

export default function TeamMemberCard({ member, colorIndex }) {
  const initial = member.name.charAt(0);

  return (
    <div className="text-center">
      <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white ${AVATAR_COLORS[colorIndex % AVATAR_COLORS.length]}`}>{initial}</div>
      <p className="mt-4 font-display text-base font-bold text-cms-ink">{member.name}</p>
      <p className="mt-1 text-sm text-cms-secondary">{member.role}</p>
    </div>
  );
}
