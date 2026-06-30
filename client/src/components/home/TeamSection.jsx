import Eyebrow from "../ui/Eyebrow";

export default function TeamSection() {
  return (
    <section id="team" className="py-16">
      <div className="mb-10 text-center">
        <Eyebrow>OUR TEAM</Eyebrow>
        <h2 className="font-display text-h2 font-bold text-cms-ink">Meet the Executive Council</h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-cms-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <p className="text-center text-sm text-cms-muted">No team members yet.</p>
    </section>
  );
}
