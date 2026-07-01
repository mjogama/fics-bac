import api from "@/lib/api/api";
import { normalizeContact, normalizeConcerns } from "@/lib/api/cmsAPI/contactUs/normalizers";
import type { ContactData } from "@/lib/constants/placeholders/contactUsPlaceholder";

export const cmsContact = async () => {
  return await Promise.all([
    api.get("/contact/data").then((response) => normalizeContact(response.data.data?.[0] ?? response.data.data)),
    api.get("/concern/data").then((response) => normalizeConcerns(response.data.data)),
  ]);
};

export const updateContact = async (id: string, data: Omit<ContactData, "id">) => {
  const response = await api.patch(`/contact/update/${id}`, {
    ...data,
    socials: data.socials.filter(Boolean),
  });

  return normalizeContact(response.data.data);
};
