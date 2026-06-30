import Eyebrow from "../ui/Eyebrow";
import ImageSlot from "../ui/ImageSlot";

export default function AboutSection() {
  return (
    <section id="about" className="grid grid-cols-[0.9fr_1.1fr] gap-14 py-16">
      <ImageSlot id="fics-about" readOnly className="h-[400px] rounded-cmscard" />
      <div>
        <Eyebrow>ABOUT US</Eyebrow>
        <h2 className="font-display text-h2 font-bold text-cms-ink">Lorem ipsum dolor sit amet.</h2>
        <p className="mt-5 text-base leading-relaxed text-cms-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </section>
  );
}
