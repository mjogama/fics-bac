import Card from "../../components/ui/Card";

export default function Contact() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr] lg:gap-6">
      <Card className="p-4 sm:p-6">
        <h2 className="mb-4 font-display text-base font-bold text-cms-ink">Inbox</h2>
        <p className="text-sm text-cms-muted">No messages yet.</p>
      </Card>

      <Card className="p-4 sm:p-6">
        <h2 className="mb-4 font-display text-base font-bold text-cms-ink">Contact Info</h2>
        <div className="space-y-4 text-sm text-cms-secondary">
          <p>lorem@example.com</p>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum office hours</p>
          <p>@lorem</p>
        </div>
      </Card>
    </div>
  );
}
