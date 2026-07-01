"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CmsModal, CmsModalActions } from "@/components/cms/cms-modal";
import { CmsInputField } from "@/components/cms/cms-input-field";
import type { ContactData } from "@/lib/constants/placeholders/contactUsPlaceholder";

const CONTACT_FIELDS: { key: keyof Omit<ContactData, "id" | "socials">; label: string }[] = [
  { key: "email", label: "Email" },
  { key: "location", label: "Location" },
  { key: "office_hours", label: "Office hours" },
];

const SOCIAL_URL_PATTERN = /^https?:\/\/.+/;

function validateSocialUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    new URL(trimmed);
  } catch {
    return "Enter a valid URL.";
  }

  if (!SOCIAL_URL_PATTERN.test(trimmed)) {
    return "Link must start with http:// or https://.";
  }

  return null;
}

function validateSocials(socials: string[]): Record<number, string> {
  const errors: Record<number, string> = {};
  const nonEmpty = socials.map((social) => social.trim()).filter(Boolean);

  if (nonEmpty.length === 0) {
    errors[0] = "At least one social link is required.";
    return errors;
  }

  socials.forEach((social, index) => {
    const error = validateSocialUrl(social);
    if (error) {
      errors[index] = error;
    }
  });

  return errors;
}

type ContactEditModalProps = {
  open: boolean;
  data: ContactData;
  onClose: () => void;
  onSave: (data: ContactData) => void | Promise<void>;
  isSaving?: boolean;
};

export function ContactEditModal({ open, data, onClose, onSave, isSaving = false }: ContactEditModalProps) {
  const [draft, setDraft] = useState<ContactData>(data);
  const [prevOpen, setPrevOpen] = useState(open);
  const [socialErrors, setSocialErrors] = useState<Record<number, string>>({});

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setDraft({
        ...data,
        socials: data.socials.length > 0 ? [...data.socials] : [""],
      });
      setSocialErrors({});
    }
  }

  const updateField: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setDraft((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateSocial = (index: number, value: string) => {
    setDraft((prev) => ({
      ...prev,
      socials: prev.socials.map((social, i) => (i === index ? value : social)),
    }));

    setSocialErrors((prev) => {
      if (!prev[index]) return prev;

      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const blurSocial = (index: number, value: string) => {
    const error = validateSocialUrl(value);
    setSocialErrors((prev) => {
      const next = { ...prev };
      if (error) {
        next[index] = error;
      } else {
        delete next[index];
      }
      return next;
    });
  };

  const addSocial = () => {
    setDraft((prev) => ({
      ...prev,
      socials: [...prev.socials, ""],
    }));
  };

  const removeSocial = (index: number) => {
    setDraft((prev) => {
      const nextSocials = prev.socials.filter((_, i) => i !== index);
      return {
        ...prev,
        socials: nextSocials.length > 0 ? nextSocials : [""],
      };
    });

    setSocialErrors((prev) => {
      const next: Record<number, string> = {};
      Object.entries(prev).forEach(([key, message]) => {
        const currentIndex = Number(key);
        if (currentIndex === index) return;
        next[currentIndex > index ? currentIndex - 1 : currentIndex] = message;
      });
      return next;
    });
  };

  const handleSave = async () => {
    const errors = validateSocials(draft.socials);
    if (Object.keys(errors).length > 0) {
      setSocialErrors(errors);
      return;
    }

    await onSave({
      ...draft,
      socials: draft.socials.map((social) => social.trim()).filter(Boolean),
    });
    onClose();
  };

  return (
    <CmsModal open={open} onClose={onClose} eyebrow="Edit contact" title="Contact Info" footer={<CmsModalActions onCancel={onClose} onSave={handleSave} isSaving={isSaving} />}>
      <div className="space-y-4">
        {CONTACT_FIELDS.map(({ key, label }) => (
          <CmsInputField key={key} label={label} name={key} value={draft[key]} onChange={updateField} />
        ))}

        <div className="space-y-2">
          <p className="font-bold text-[10px] uppercase tracking-wide text-cms-labelfaint">Socials</p>
          {draft.socials.map((social, index) => (
            <div key={index} className="flex items-start gap-2">
              <CmsInputField
                className="min-w-0 flex-1"
                label={index === 0 ? undefined : ""}
                name={`social-${index}`}
                value={social}
                onChange={(e) => updateSocial(index, e.target.value)}
                onBlur={(e) => blurSocial(index, e.target.value)}
                placeholder="https://"
                error={socialErrors[index]}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Remove social link"
                onClick={() => removeSocial(index)}
                className="size-9 shrink-0 text-cms-muted hover:bg-cms-rowhover hover:text-cms-accent">
                <X size={16} strokeWidth={1.75} />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addSocial}
            className="h-9 w-full rounded-cmsbtn border-[1.5px] border-dashed border-cms-inputborder bg-cms-surface text-sm text-cms-secondary hover:bg-cms-rowhover">
            <Plus size={16} strokeWidth={1.75} />
            Add social link
          </Button>
        </div>
      </div>
    </CmsModal>
  );
}
