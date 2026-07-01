import type { OurTeamPayload } from "@/lib/types/modules/ourTeamType";
import type { OurTeamBranch, TeamMember } from "@/lib/constants/placeholders/ourTeamPlaceholder";
import { OUR_TEAM_BRANCHES } from "@/lib/constants/placeholders/ourTeamPlaceholder";

type RawOfficer = Partial<OurTeamPayload> & {
  _id?: string;
  id?: string;
};

const normalizeBranch = (branch?: string): OurTeamBranch => {
  if (branch && OUR_TEAM_BRANCHES.includes(branch as OurTeamBranch)) {
    return branch as OurTeamBranch;
  }

  return OUR_TEAM_BRANCHES[0];
};

export const normalizeOfficer = (officer: RawOfficer = {}): TeamMember => {
  return {
    id: String(officer.id ?? officer._id ?? ""),
    fullName: officer.fullName ?? "",
    position: officer.position ?? "",
    term: officer.term ?? "",
    branch: normalizeBranch(officer.branch),
    profile_image_url: officer.profile_image_url ?? "",
    public_id: officer.public_id ?? "",
  };
};

export const normalizeOfficers = (officers: RawOfficer | RawOfficer[] | null | undefined): TeamMember[] => {
  const list = Array.isArray(officers) ? officers : officers ? [officers] : [];
  return list.map(normalizeOfficer);
};
