"use client";

import { useState } from "react";

import { CmsModal, CmsModalActions } from "@/components/cms/cms-modal";
import { CmsInputField } from "@/components/cms/cms-input-field";
import { CmsImageUpload } from "@/components/cms/cms-image-upload";
import { CmsTextareaField } from "@/components/cms/cms-textarea-field";
import type { HomepageData } from "@/lib/constants/placeholders/homepagePlaceholder";

type HomepageEditModalProps = {
  open: boolean;
  data: HomepageData;
  onClose: () => void;
  onSave: (data: HomepageData, imageFile?: File | null) => void | Promise<void>;
  isSaving?: boolean;
};

export function HomepageEditModal({ open, data, onClose, onSave, isSaving = false }: HomepageEditModalProps) {
  const [draft, setDraft] = useState<HomepageData>(data);
  const [prevOpen, setPrevOpen] = useState(open);
  const [newImage, setNewImage] = useState<File | null>(null);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setDraft({ ...data });
      setNewImage(null);
    }
  }

  const updateField: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setDraft((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    await onSave(draft, newImage);
    onClose();
  };

  return (
    <CmsModal fitContent open={open} onClose={onClose} eyebrow="Edit homepage" title="Homepage" footer={<CmsModalActions onCancel={onClose} onSave={handleSave} isSaving={isSaving} />}>
      <div className="space-y-4">
        <CmsImageUpload label="Image" imageUrl={data.bg_image_url} onFileChange={setNewImage} resetKey={open} alt="Homepage background" />
        <CmsInputField label="Title" name="title" value={draft.title} onChange={updateField} />
        <CmsInputField label="Sub Title" name="sub_title" value={draft.sub_title} onChange={updateField} />
        <CmsTextareaField label="Description" name="description" value={draft.description} onChange={updateField} rows={5} />
      </div>
    </CmsModal>
  );
}
