import type { ContactPayload, ConcernPayload } from "@/lib/types/modules/contactUsType";
import type { ContactData, ConcernMessage } from "@/lib/constants/placeholders/contactUsPlaceholder";

type RawConcern = Partial<ConcernPayload> & {
  _id?: string;
  id?: string;
  createdAt?: string;
};

type RawContact = Partial<ContactPayload> & {
  _id?: string;
  id?: string;
};

export const normalizeContact = (contact: RawContact): ContactData => {
  return {
    id: String(contact.id ?? contact._id ?? ""),
    email: contact.email ?? "",
    location: contact.location ?? "",
    office_hours: contact.office_hours ?? "",
    socials: contact.socials ?? [],
  };
};

export const normalizeConcerns = (concerns: RawConcern | RawConcern[] | null | undefined): ConcernMessage[] => {
  const list = Array.isArray(concerns) ? concerns : concerns ? [concerns] : [];

  return list.map((concern) => {
    const created = concern.createdAt ? new Date(concern.createdAt) : null;

    return {
      id: String(concern.id ?? concern._id ?? ""),
      name: concern.name ?? "",
      email: concern.email ?? "",
      type: concern.type ?? "General",
      subject: concern.subject ?? "",
      details: concern.details ?? "",
      date: created ? created.toLocaleDateString() : "",
      time: created ? created.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "",
    };
  });
};
