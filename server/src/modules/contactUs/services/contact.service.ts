import Contact from "../models/Contact";

import type { ContactPayload } from "@app/types/modules/contactUsType";

export const createContact = async (payload: ContactPayload) => {
  return await Contact.create(payload);
};

export const findContacts = async () => {
  return await Contact.find();
};

export const findContactById = async (id: string) => {
  return await Contact.findOne({ _id: id });
};

export const updateContactById = async (id: string, data: Partial<ContactPayload>) => {
  return await Contact.findOneAndUpdate({ _id: id }, { $set: data }, { returnDocument: "after", runValidators: true });
};
