import Membership from "../models/Membership";

import type { MembershipType } from "@app/types/modules/membershipType";

export const createMembershipTransaction = async (payload: MembershipType) => {
  return await Membership.create(payload);
};

export const findMembershipTransactions = async () => {
  return await Membership.find();
};

export const findMembershipTransactionById = async (id: string) => {
  return await Membership.findOne({ _id: id }).select("_id public_ids");
};

export const updateMembershipTransactionById = async (id: string, data: Partial<MembershipType>) => {
  return await Membership.updateOne({ _id: id }, { $set: data });
};

export const deleteMembershipTransactionById = async (id: string) => {
  return await Membership.findOneAndDelete({ _id: id });
};
