import { useEffect, useState } from "react";
import Button from "../ui/Button";
import InlineDateInput from "../ui/InlineDateInput";
import InlineInput from "../ui/InlineInput";
import InlineTextarea from "../ui/InlineTextarea";
import Modal, { FormField } from "../ui/Modal";
import StatusSelect from "../ui/StatusSelect";
import TimeSelect from "../ui/TimeSelect";
import { EVENT_STATUSES } from "../../constants/adminNav";

const EVENT_FIELDS = ["title", "start_date", "end_date", "time", "location", "description", "status"];

export default function EventEditModal({ event, open, onClose, onSave }) {
  const [draft, setDraft] = useState(event ?? {});

  useEffect(() => {
    if (open && event) {
      setDraft({ ...event });
    }
  }, [open, event]);

  if (!event) return null;

  const setField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    EVENT_FIELDS.forEach((field) => {
      if (draft[field] !== event[field]) {
        onSave(event.id, field, draft[field]);
      }
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow="Edit event"
      title={event.title || "New event"}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </>
      }>
      <div className="space-y-4">
        <FormField label="Title">
          <InlineInput value={draft.title} onChange={(v) => setField("title", v)} />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Start date">
            <InlineDateInput value={draft.start_date} onChange={(v) => setField("start_date", v)} />
          </FormField>
          <FormField label="End date">
            <InlineDateInput value={draft.end_date} onChange={(v) => setField("end_date", v)} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Time">
            <TimeSelect value={draft.time} onChange={(v) => setField("time", v)} className="w-full max-w-none" />
          </FormField>
          <FormField label="Status">
            <StatusSelect value={draft.status} options={EVENT_STATUSES} onChange={(v) => setField("status", v)} className="w-full max-w-none" />
          </FormField>
        </div>

        <FormField label="Location">
          <InlineInput value={draft.location} onChange={(v) => setField("location", v)} />
        </FormField>

        <FormField label="Description">
          <InlineTextarea value={draft.description} onChange={(v) => setField("description", v)} rows={8} />
        </FormField>
      </div>
    </Modal>
  );
}
