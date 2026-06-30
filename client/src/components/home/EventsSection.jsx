import Eyebrow from "../ui/Eyebrow";

export default function EventsSection() {
  return (
    <section id="events" className="py-16">
      <div className="mb-10 text-center">
        <Eyebrow>UPCOMING EVENTS</Eyebrow>
        <h2 className="font-display text-h2 font-bold text-cms-ink">What&apos;s happening next</h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-cms-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <p className="text-center text-sm text-cms-muted">No upcoming events.</p>
    </section>
  );
}
