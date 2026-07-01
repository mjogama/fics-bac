import api from "@/lib/api/api";
import type { OurTeamBranch, TeamMember } from "@/lib/constants/placeholders/ourTeamPlaceholder";
import { normalizeOfficer, normalizeOfficers } from "@/lib/api/cmsAPI/ourTeam/normalizers";

type OfficerFields = Pick<TeamMember, "fullName" | "position" | "term" | "branch">;

export const cmsOurTeam = async (): Promise<TeamMember[]> => {
  const response = await api.get("/our-team/data");
  return normalizeOfficers(response.data.data);
};

export const createOfficer = async (data: OfficerFields, imageFile: File): Promise<TeamMember> => {
  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("position", data.position);
  formData.append("term", data.term);
  formData.append("branch", data.branch);
  formData.append("profile_image_url", imageFile);

  const response = await api.post("/our-team/create", formData);
  return normalizeOfficer(response.data.data);
};

export const updateOfficer = async (id: string, data: Partial<OfficerFields>, imageFile?: File | null): Promise<TeamMember> => {
  if (imageFile) {
    const formData = new FormData();

    if (data.fullName !== undefined) formData.append("fullName", data.fullName);
    if (data.position !== undefined) formData.append("position", data.position);
    if (data.term !== undefined) formData.append("term", data.term);
    if (data.branch !== undefined) formData.append("branch", data.branch);
    formData.append("profile_image_url", imageFile);

    const response = await api.patch(`/our-team/update/${id}`, formData);
    return normalizeOfficer(response.data.data);
  }

  const response = await api.patch(`/our-team/update/${id}`, data);
  return normalizeOfficer(response.data.data);
};

export type { OurTeamBranch, TeamMember };
