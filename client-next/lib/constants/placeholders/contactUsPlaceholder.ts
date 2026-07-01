import type { ConcernTypeField } from "@/lib/types/modules/contactUsType";

export const CONCERN_TYPES = ["General", "Fees", "Events", "Technical", "Suggestion", "Complaint", "Other"] as const;

export const CONCERN_PLACEHOLDER = {
  email: "",
  name: "",
  type: "General" as ConcernTypeField,
  subject: "",
  details: "",
};

export const CONCERNS_PLACEHOLDER: ConcernMessage[] = [];

export const CONTACT_PLACEHOLDER = {
  id: "",
  email: "",
  location: "",
  office_hours: "",
  socials: [] as string[],
};

export type ContactData = typeof CONTACT_PLACEHOLDER;
export type ConcernData = typeof CONCERN_PLACEHOLDER;

export type ConcernMessage = ConcernData & {
  id: string;
  date: string;
  time: string;
};
