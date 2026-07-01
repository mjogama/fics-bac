"use client";

import { useState } from "react";

import { CmsModal, CmsModalActions } from "@/components/cms/cms-modal";
import { CmsInputField } from "@/components/cms/cms-input-field";
import { CmsImageUpload } from "@/components/cms/cms-image-upload";
import { OUR_TEAM_BRANCHES, type OurTeamBranch } from "@/lib/constants/placeholders/ourTeamPlaceholder";
import { cn } from "@/lib/utils/utils";

type TeamMemberDraft = {
  fullName: string;
  position: string;
  term: string;
  branch: OurTeamBranch;
};

type TeamMemberAddModalProps = {
  open: boolean;
  defaultBranch: OurTeamBranch;
  onClose: () => void;
  onSave: (data: TeamMemberDraft, imageFile: File) => void | Promise<void>;
  isSaving?: boolean;
};

const EMPTY_DRAFT = (branch: OurTeamBranch): TeamMemberDraft => ({
  fullName: "",
  position: "",
  term: "",
  branch,
});

export function TeamMemberAddModal({ open, defaultBranch, onClose, onSave, isSaving = false }: TeamMemberAddModalProps) {
  const [draft, setDraft] = useState<TeamMemberDraft>(EMPTY_DRAFT(defaultBranch));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [prevOpen, setPrevOpen] = useState(open);
  const [error, setError] = useState("");

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setDraft(EMPTY_DRAFT(defaultBranch));
      setImageFile(null);
      setError("");
    }
  }

  const updateField: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setDraft((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!draft.fullName.trim() || !draft.position.trim() || !draft.term.trim()) {
      setError("Name, position, and term are required.");
      return;
    }

    if (!imageFile) {
      setError("A profile image is required.");
      return;
    }

    setError("");
    await onSave(draft, imageFile);
    onClose();
  };

  return (
    <CmsModal open={open} onClose={onClose} eyebrow="Add member" title="New team member" footer={<CmsModalActions onCancel={onClose} onSave={handleSave} isSaving={isSaving} saveLabel="Add member" />}>
      <div className="space-y-4">
        <CmsImageUpload label="Profile image" onFileChange={setImageFile} resetKey={open} alt="New member profile preview" />

        <CmsInputField label="Name" name="fullName" value={draft.fullName} onChange={updateField} placeholder="Full name" required />
        <CmsInputField label="Position" name="position" value={draft.position} onChange={updateField} placeholder="Role or title" required />
        <CmsInputField label="Term" name="term" value={draft.term} onChange={updateField} placeholder="e.g. 2025–2026" required />

        <div className="space-y-1.5">
          <p className="font-bold text-[10px] uppercase tracking-wide text-cms-labelfaint">Branch</p>
          <div className="flex flex-wrap gap-2">
            {OUR_TEAM_BRANCHES.map((branch) => (
              <button
                key={branch}
                type="button"
                onClick={() => setDraft((prev) => ({ ...prev, branch }))}
                className={cn(
                  "rounded-cmspill border-[1.5px] px-3 py-1.5 font-mono text-xs transition-colors",
                  draft.branch === branch ? "border-cms-ink bg-cms-ink text-white" : "border-cms-inputborder bg-cms-surface text-cms-muted hover:bg-cms-rowhover",
                )}>
                {branch}
              </button>
            ))}
          </div>
        </div>

        {error ? <p className="text-xs text-destructive">{error}</p> : null}
      </div>
    </CmsModal>
  );
}
