import { useRef } from "react";
import Button from "../ui/Button";
import ImageSlot from "../ui/ImageSlot";
import InlineDateInput from "../ui/InlineDateInput";
import InlineInput from "../ui/InlineInput";
import InlineTextarea from "../ui/InlineTextarea";
import Modal, { FormField } from "../ui/Modal";
import StatusSelect from "../ui/StatusSelect";
import TimeSelect from "../ui/TimeSelect";
import { EVENT_STATUSES } from "../../constants/adminNav";

export default function EventCreateModal({ open, onClose, onCreate, nextEventId }) {
  const formRef = useRef(null);
  const imageSlotId = `event-${nextEventId}`;

  const resetAndClose = () => {
    formRef.current?.reset();
    localStorage.removeItem(`imgslot:${imageSlotId}`);
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    onCreate(data);
    event.target.reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={resetAndClose}
      eyebrow="Create event"
      title="New event"
      footer={
        <>
          <Button type="button" variant="outline" onClick={resetAndClose}>
            Cancel
          </Button>
          <Button type="submit" form="event-create-form">
            Create event
          </Button>
        </>
      }>
      <form id="event-create-form" ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Event image">
          <ImageSlot id={imageSlotId} />
        </FormField>

        <FormField label="Title">
          <InlineInput name="title" required placeholder="Event title" />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Start date">
            <InlineDateInput name="start_date" required />
          </FormField>
          <FormField label="End date">
            <InlineDateInput name="end_date" required />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Time">
            <TimeSelect name="time" required className="w-full max-w-none" />
          </FormField>
          <FormField label="Status">
            <StatusSelect name="status" defaultValue="upcoming" options={EVENT_STATUSES} required className="w-full max-w-none" />
          </FormField>
        </div>

        <FormField label="Location">
          <InlineInput name="location" required placeholder="Venue or room" />
        </FormField>

        <FormField label="Description">
          <InlineTextarea name="description" required rows={6} placeholder="What is this event about?" />
        </FormField>
      </form>
    </Modal>
  );
}
