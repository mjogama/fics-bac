"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";

import { CmsModal, CmsModalActions } from "@/components/cms/cms-modal";
import { CmsInputField } from "@/components/cms/cms-input-field";
import { CmsImageUpload } from "@/components/cms/cms-image-upload";
import { Input } from "@/components/ui/input";
import { OUR_TEAM_BRANCHES, type TeamMember } from "@/lib/constants/placeholders/ourTeamPlaceholder";
import { cn } from "@/lib/utils/utils";

type TeamMemberEditModalProps = {
  open: boolean;
  team: TeamMember[];
  onClose: () => void;
  onSave: (member: TeamMember, imageFile?: File | null) => void | Promise<void>;
  isSaving?: boolean;
};

type MemberDraft = Pick<TeamMember, "id" | "fullName" | "position" | "term" | "branch" | "profile_image_url">;

const searchInputClassName =
  "h-10 rounded-cmsinput border-cms-inputborder bg-cms-inputbg pl-9 text-sm text-cms-body placeholder:text-cms-placeholder focus-visible:border-cms-inputborder focus-visible:bg-cms-surface focus-visible:ring-0";

function matchesQuery(member: TeamMember, query: string) {
  const value = query.trim().toLowerCase();
  if (!value) return true;

  return [member.fullName, member.position, member.branch, member.term].some((field) => field.toLowerCase().includes(value));
}

const MODAL_PANEL_CLASSNAME = "h-[min(92dvh,560px)] max-h-[min(92dvh,560px)]";
const MODAL_CONTENT_CLASSNAME = "flex min-h-0 flex-1 flex-col overflow-hidden";

export function TeamMemberEditModal({ open, team, onClose, onSave, isSaving = false }: TeamMemberEditModalProps) {
  const [view, setView] = useState<"search" | "edit">("search");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<MemberDraft | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [prevOpen, setPrevOpen] = useState(open);
  const [error, setError] = useState("");

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setView("search");
      setQuery("");
      setDraft(null);
      setImageFile(null);
      setError("");
    }
  }

  const searchResults = useMemo(() => {
    const results = team.filter((member) => matchesQuery(member, query));
    return results.sort((a, b) => a.fullName.localeCompare(b.fullName, undefined, { sensitivity: "base" }));
  }, [team, query]);

  const updateField: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setDraft((prev) => (prev ? { ...prev, [e.target.name]: e.target.value } : prev));
  };

  const selectMember = (member: TeamMember) => {
    setDraft({
      id: member.id,
      fullName: member.fullName,
      position: member.position,
      term: member.term,
      branch: member.branch,
      profile_image_url: member.profile_image_url,
    });
    setImageFile(null);
    setError("");
    setView("edit");
  };

  const backToSearch = () => {
    setView("search");
    setDraft(null);
    setImageFile(null);
    setError("");
  };

  const handleSave = async () => {
    if (!draft) return;

    if (!draft.fullName.trim() || !draft.position.trim() || !draft.term.trim()) {
      setError("Name, position, and term are required.");
      return;
    }

    setError("");

    try {
      await onSave(draft as TeamMember, imageFile);
      onClose();
    } catch {
      setError("Could not save changes. Try again.");
    }
  };

  return (
    <CmsModal
      open={open}
      onClose={onClose}
      eyebrow={view === "edit" ? "Edit member" : "Team"}
      title={view === "edit" ? draft?.fullName || "Edit member" : "Find the officer"}
      panelClassName={MODAL_PANEL_CLASSNAME}
      contentClassName={MODAL_CONTENT_CLASSNAME}
      footer={view === "edit" ? <CmsModalActions onCancel={backToSearch} onSave={handleSave} isSaving={isSaving} saveLabel="Save changes" /> : null}>
      {view === "search" ? (
        <div className="flex min-h-0 flex-1 flex-col gap-4">
          <div className="relative shrink-0">
            <Search size={16} strokeWidth={1.75} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-cms-muted" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, position, or branch"
              className={searchInputClassName}
              aria-label="Search team members"
            />
          </div>

          <div className="min-h-0 flex-1 space-y-1 overflow-y-auto scrollbar-hide">
            {searchResults.length === 0 ? (
              <p className="py-8 text-center text-sm text-cms-muted">No members found.</p>
            ) : (
              searchResults.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => selectMember(member)}
                  className="flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left transition-colors cursor-pointer hover:border-cms-inputborder hover:bg-cms-rowhover">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cms-pillbg font-display text-sm font-bold text-cms-ink">
                    {member.fullName.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-cms-ink">{member.fullName}</p>
                    <p className="truncate text-xs text-cms-muted">
                      {member.position} · {member.branch}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      ) : draft ? (
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto scrollbar-hide">
          <button type="button" onClick={backToSearch} className="inline-flex items-center gap-1.5 text-sm font-medium text-cms-muted transition-colors hover:text-cms-ink">
            <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
            Back to search
          </button>

          <CmsImageUpload label="Profile image" imageUrl={draft.profile_image_url} onFileChange={setImageFile} resetKey={`${draft.id}-${open}`} alt={`${draft.fullName} profile preview`} />

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
                  onClick={() => setDraft((prev) => (prev ? { ...prev, branch } : prev))}
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
      ) : null}
    </CmsModal>
  );
}
