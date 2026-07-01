"use client";

import { useState } from "react";

import { CmsModal, CmsModalActions } from "@/components/cms/cms-modal";
import { CmsTextareaField } from "@/components/cms/cms-textarea-field";
import type { AboutData } from "@/lib/constants/placeholders/aboutPlaceholder";

type AboutEditModalProps = {
  open: boolean;
  data: AboutData;
  onClose: () => void;
  onSave: (data: AboutData) => void | Promise<void>;
  isSaving?: boolean;
};

export function AboutEditModal({ open, data, onClose, onSave, isSaving = false }: AboutEditModalProps) {
  const [draft, setDraft] = useState<AboutData>(data);
  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setDraft({ ...data });
    }
  }

  const updateField: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setDraft((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    await onSave(draft);
    onClose();
  };

  return (
    <CmsModal open={open} onClose={onClose} eyebrow="Edit about" title="About" footer={<CmsModalActions onCancel={onClose} onSave={handleSave} isSaving={isSaving} />}>
      <div className="space-y-4">
        <CmsTextareaField label="Organization About" name="org_about" value={draft.org_about} onChange={updateField} rows={5} />
        <CmsTextareaField label="Mission" name="mission" value={draft.mission} onChange={updateField} rows={4} />
        <CmsTextareaField label="Vision" name="vision" value={draft.vision} onChange={updateField} rows={4} />
      </div>
    </CmsModal>
  );
}
