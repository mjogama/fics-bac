import Badge from "../ui/Badge";
import ImageSlot from "../ui/ImageSlot";
import { formatEventDate } from "../../utils/formatEventDate";

export default function EventCard({ event }) {
  return (
    <article className="group">
      <div className="relative h-[168px] overflow-hidden rounded-cmscard">
        <ImageSlot id={`event-${event.id}`} readOnly className="h-full w-full" />
        <span className="absolute top-3 left-3 rounded-cmspill bg-cms-surface px-2.5 py-1 font-mono text-[10px] font-bold text-cms-ink">{formatEventDate(event.start_date)}</span>
        <span className="absolute right-3 bottom-3">
          <Badge tone="light">{event.status === "upcoming" ? "Upcoming" : "Past"}</Badge>
        </span>
      </div>
      <h3 className="mt-4 font-display text-[22px] font-bold text-cms-ink">{event.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-cms-secondary">{event.description}</p>
      <a href="#events" className="mt-3 inline-block text-sm font-medium text-cms-ink no-underline transition-colors hover:text-cms-secondary">
        Learn more →
      </a>
    </article>
  );
}
