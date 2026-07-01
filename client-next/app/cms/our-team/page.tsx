"use client";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TeamMemberAddModal } from "@/components/cms/modals/team-member-add-modal";
import { TeamMemberEditModal } from "@/components/cms/modals/team-member-edit-modal";
import { cmsOurTeam, createOfficer, updateOfficer } from "@/lib/api/cmsAPI/ourTeam/ourTeam";
import { OUR_TEAM_BRANCHES, TEAM_PLACEHOLDER, type OurTeamBranch, type TeamMember } from "@/lib/constants/placeholders/ourTeamPlaceholder";
import { compareExecutiveMembers } from "@/lib/utils/executivePositionRank";

const GRID_COLS = "sm:grid-cols-[minmax(180px,1.3fr)_minmax(160px,1.4fr)_minmax(120px,1.1fr)]";

const memberRowClassName = `flex flex-col gap-2 border-b border-cms-divider px-3 py-2.5 transition-colors hover:bg-cms-bg/35 sm:grid sm:items-start sm:gap-3 sm:px-4 ${GRID_COLS}`;

const branchToolbarClassName = "border-b border-cms-divider px-3 py-3 sm:px-4";

const branchLabelClassName = "font-mono text-[11px] uppercase tracking-[0.08em] text-cms-muted";

const inlineInputClassName =
  "h-auto cursor-default rounded-cmsinput border-cms-inputborder bg-cms-inputbg px-2 py-1.5 text-sm text-cms-body placeholder:text-cms-placeholder read-only:focus-visible:border-cms-inputborder read-only:focus-visible:bg-cms-inputbg read-only:focus-visible:ring-0";

function FilterChip({ label, active, count, onClick, className }: { label: string; active: boolean; count?: number; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        active
          ? "rounded-cmspill border-[1.5px] border-cms-ink bg-cms-ink px-3 py-1.5 font-mono text-xs text-white"
          : "rounded-cmspill border-[1.5px] border-cms-inputborder bg-cms-surface px-3 py-1.5 font-mono text-xs text-cms-muted hover:bg-cms-rowhover",
        className,
      )}>
      {label}
      {count !== undefined ? <span className={active ? "ml-1.5 opacity-70" : "ml-1.5 text-cms-muted2"}>{count}</span> : null}
    </button>
  );
}

function TeamTableSkeleton() {
  return (
    <div className="space-y-0">
      <div className={`hidden items-center gap-2 border-b border-cms-divider bg-cms-tablehead px-3 py-3 sm:grid sm:gap-3 sm:px-4 ${GRID_COLS}`}>
        {["Name", "Position", "Term"].map((header) => (
          <Skeleton key={header} className="h-3 w-16" />
        ))}
      </div>
      <div className={branchToolbarClassName}>
        <div className="flex flex-col gap-2 sm:hidden">
          <span className={branchLabelClassName}>Branch:</span>
          {OUR_TEAM_BRANCHES.map((branch) => (
            <Skeleton key={branch} className="h-9 w-full rounded-cmspill" />
          ))}
          <Skeleton className="mt-1 h-9 w-full rounded-cmsbtn" />
        </div>
        <div className="hidden items-start justify-between gap-2 sm:flex">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            <Skeleton className="h-3 w-14" />
            {OUR_TEAM_BRANCHES.map((branch) => (
              <Skeleton key={branch} className="h-8 w-28 rounded-cmspill" />
            ))}
          </div>
          <Skeleton className="h-9 w-28 shrink-0 rounded-cmsbtn" />
        </div>
      </div>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className={memberRowClassName}>
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-[34px] w-[34px] rounded-full" />
            <Skeleton className="h-9 w-full rounded-cmsinput" />
          </div>
          <Skeleton className="h-9 w-full rounded-cmsinput" />
          <Skeleton className="h-9 w-full rounded-cmsinput" />
        </div>
      ))}
    </div>
  );
}

export default function OurTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(TEAM_PLACEHOLDER);
  const [activeBranch, setActiveBranch] = useState<OurTeamBranch>("Executive Council");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  useEffect(() => {
    const retrieveTeam = async () => {
      try {
        setIsLoading(true);
        const officers = await cmsOurTeam();
        setTeam(officers);
      } catch (err) {
        console.error(err instanceof Error ? err.message : err);
      } finally {
        setIsLoading(false);
      }
    };

    retrieveTeam();
  }, []);

  const branchCounts = useMemo(() => {
    return Object.fromEntries(OUR_TEAM_BRANCHES.map((branch) => [branch, team.filter((member) => member.branch === branch).length])) as Record<OurTeamBranch, number>;
  }, [team]);

  const filteredTeam = useMemo(() => {
    const members = team.filter((member) => member.branch === activeBranch);

    if (activeBranch === "Executive Council") {
      return [...members].sort(compareExecutiveMembers);
    }

    return members;
  }, [team, activeBranch]);

  const handleAddMember = async (data: Pick<TeamMember, "fullName" | "position" | "term" | "branch">, imageFile: File) => {
    try {
      setIsCreating(true);
      const created = await createOfficer(data, imageFile);
      setTeam((current) => [...current, created]);
      setActiveBranch(data.branch);
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditMember = async (member: TeamMember, imageFile?: File | null) => {
    if (!member.id) return;

    try {
      setIsSavingEdit(true);
      const updated = await updateOfficer(
        member.id,
        {
          fullName: member.fullName,
          position: member.position,
          term: member.term,
          branch: member.branch,
        },
        imageFile,
      );
      setTeam((current) => current.map((row) => (row.id === member.id ? updated : row)));
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
      throw err;
    } finally {
      setIsSavingEdit(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden rounded-cmscard border-cms-cardborder bg-cms-surface py-0 ring-0">
        {isLoading ? (
          <TeamTableSkeleton />
        ) : (
          <div className="w-full sm:scrollbar-hide sm:overflow-x-auto">
            <div className="w-full sm:w-max sm:min-w-full">
              <div
                className={`hidden items-center gap-2 border-b border-cms-divider bg-cms-tablehead px-3 py-3 font-mono text-[10px] uppercase tracking-wide text-cms-labelfaint sm:grid sm:gap-3 sm:px-4 ${GRID_COLS}`}>
                <span>Name</span>
                <span>Position</span>
                <span>Term</span>
              </div>

              <div className={branchToolbarClassName}>
                <div className="flex flex-col gap-2 sm:hidden">
                  <span className={branchLabelClassName}>Branch:</span>
                  {OUR_TEAM_BRANCHES.map((branch) => (
                    <FilterChip key={branch} label={branch} active={activeBranch === branch} count={branchCounts[branch]} onClick={() => setActiveBranch(branch)} className="w-full text-left" />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditModalOpen(true)}
                    className="h-9 w-full rounded-cmsbtn border-[1.5px] border-cms-inputborder bg-cms-surface text-sm font-medium text-cms-ink hover:bg-cms-rowhover">
                    Edit member
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="h-9 w-full gap-1.5 rounded-cmsbtn border-[1.5px] border-cms-ink bg-cms-ink px-4 text-sm font-medium text-white hover:bg-cms-body">
                    <Plus size={16} strokeWidth={2} aria-hidden="true" />
                    Add member
                  </Button>
                </div>
                <div className="hidden items-start justify-between gap-2 sm:flex">
                  <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                    <span className={branchLabelClassName}>Branch:</span>
                    {OUR_TEAM_BRANCHES.map((branch) => (
                      <FilterChip key={branch} label={branch} active={activeBranch === branch} count={branchCounts[branch]} onClick={() => setActiveBranch(branch)} />
                    ))}
                  </div>
                  <div className="flex shrink-0 items-start gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditModalOpen(true)}
                      className="h-9 rounded-cmsbtn border-[1.5px] border-cms-inputborder bg-cms-surface px-4 text-sm font-medium text-cms-ink hover:bg-cms-rowhover">
                      Edit member
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setIsAddModalOpen(true)}
                      className="h-9 shrink-0 gap-1.5 rounded-cmsbtn border-[1.5px] border-cms-ink bg-cms-ink px-4 text-sm font-medium text-white hover:bg-cms-body">
                      <Plus size={16} strokeWidth={2} aria-hidden="true" />
                      Add member
                    </Button>
                  </div>
                </div>
              </div>

              {filteredTeam.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-cms-muted">No members in {activeBranch}.</p>
              ) : (
                filteredTeam.map((member) => (
                  <div key={member.id} className={memberRowClassName}>
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-cms-pillbg font-display text-sm font-bold text-cms-ink">
                        {member.fullName.charAt(0).toUpperCase() || "?"}
                      </div>
                      <Input value={member.fullName} readOnly className={inlineInputClassName} aria-label={`Name for ${member.fullName || "member"}`} />
                    </div>
                    <Input value={member.position} readOnly className={inlineInputClassName} aria-label={`Position for ${member.fullName || "member"}`} />
                    <Input value={member.term} readOnly className={cn(inlineInputClassName, "font-mono")} aria-label={`Term for ${member.fullName || "member"}`} />
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </Card>

      <TeamMemberAddModal open={isAddModalOpen} defaultBranch={activeBranch} onClose={() => setIsAddModalOpen(false)} onSave={handleAddMember} isSaving={isCreating} />
      <TeamMemberEditModal open={isEditModalOpen} team={team} onClose={() => setIsEditModalOpen(false)} onSave={handleEditMember} isSaving={isSavingEdit} />
    </div>
  );
}
