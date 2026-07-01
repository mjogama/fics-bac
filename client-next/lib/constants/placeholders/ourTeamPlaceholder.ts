export const OUR_TEAM_BRANCHES = ["Executive Council", "Executive Coordinators", "Advisory Council", "Faculty"] as const;

export type OurTeamBranch = (typeof OUR_TEAM_BRANCHES)[number];

export const TEAM_PLACEHOLDER: TeamMember[] = [];

export type TeamMember = {
  id: string;
  fullName: string;
  position: string;
  term: string;
  branch: OurTeamBranch;
  profile_image_url: string;
  public_id: string;
};
