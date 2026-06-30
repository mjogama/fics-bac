import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import ImageSlot from "../ui/ImageSlot";
import StatRow from "./StatRow";

export default function Hero() {
  return (
    <section className="grid grid-cols-[1.05fr_0.95fr] gap-14 py-12 pb-[72px]">
      <div>
        <Eyebrow>LOREM IPSUM DOLOR</Eyebrow>
        <h1 className="font-display text-h1 font-extrabold text-cms-ink">
          Lorem ipsum <span className="text-[rgb(120,113,100)]">dolor sit amet.</span>
        </h1>
        <p className="mt-6 max-w-lg text-[20px] leading-relaxed text-cms-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
        <div className="mt-8 flex gap-4">
          <Button href="#about" variant="primary" size="lg">
            Explore our Community
          </Button>
          <Button href="#events" variant="outline" size="lg">
            View Events
          </Button>
        </div>
        <StatRow />
      </div>

      <div className="relative">
        <ImageSlot id="fics-hero" readOnly className="relative top-[14px] left-[18px] h-[420px] rounded-[26px] shadow-hero" />
        <div className="absolute bottom-8 left-0 w-[260px] rounded-xl bg-white p-4 shadow-hero">
          <pre className="font-mono text-[11px] leading-relaxed text-cms-secondary">{`const fics = {\n  build: true,\n  learn: true,\n  ship: "always"\n};`}</pre>
        </div>
        <span className="absolute right-4 bottom-24 rounded-cmspill bg-cms-ink px-3 py-1.5 font-mono text-[11px] font-bold text-white shadow-hero">&lt;/&gt; weekly workshops</span>
      </div>
    </section>
  );
}
