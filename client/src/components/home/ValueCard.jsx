export default function ValueCard({ title, body }) {
  return (
    <div className="rounded-cmscard border border-cms-cardborder bg-cms-surface p-5">
      <h3 className="font-display text-base font-bold text-cms-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-cms-secondary">{body}</p>
    </div>
  );
}
