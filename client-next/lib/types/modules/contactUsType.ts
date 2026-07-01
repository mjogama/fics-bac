export type ConcernTypeField = "General" | "Fees" | "Events" | "Technical" | "Suggestion" | "Complaint" | "Other";

export type ConcernPayload = {
  name?: string | null;
  email?: string | null;
  type: ConcernTypeField;
  subject: string;
  details: string;
};

export type ContactPayload = {
  email: string;
  location: string;
  office_hours: string;
  socials: string[];
};
