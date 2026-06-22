import asyncErrorHandler from "express-async-handler";
import type { Request, Response } from "express";

import type { FileUploadType } from "@app/types/IUploadFile";
import type { MembershipType } from "@app/types/modules/membershipType";
import { errorHandler, responseHandler, ObjectIdValidator, fileUploader, cleanupUploadedImage, deleteUploadedFile } from "@modules/utils/index";
import {
  createMembershipTransaction,
  findMembershipTransactions,
  updateMembershipTransactionById,
  deleteMembershipTransactionById,
  findMembershipTransactionById,
} from "../../services/membership.service";

export const createNewTransaction = asyncErrorHandler(async (req: Request, res: Response) => {
  const { name, purpose, amount, description } = req.body;
  const image_files = Array.isArray(req.files) ? req.files : [];

  if (image_files.length === 0 || !name || !purpose || amount === undefined || !description) {
    return errorHandler("All fields are required", 400);
  }

  const uploadResults: FileUploadType[] = [];

  try {
    for (const receipt of image_files) {
      const uploadResult = (await fileUploader(receipt.buffer)) as FileUploadType;
      uploadResults.push(uploadResult);
    }

    const payload: MembershipType = {
      ...req.body,
      image_urls: uploadResults.map((result) => result.secure_url),
      public_ids: uploadResults.map((result) => result.public_id),
    };

    await createMembershipTransaction(payload);
  } catch (error) {
    await Promise.all(uploadResults.map((result) => cleanupUploadedImage(result.public_id, "membership")));
    throw error;
  }

  responseHandler(res, true, 201, "Created transaction successfully", uploadResults);
});

export const retrieveTransactions = asyncErrorHandler(async (req: Request, res: Response) => {
  const result = await findMembershipTransactions();

  responseHandler(res, true, 200, "Retrieved membership transaction successfully", result);
});

export const updateTransaction = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, purpose, amount, description } = req.body;

  if (!id || Array.isArray(id)) {
    return errorHandler("ID not found", 400);
  }

  ObjectIdValidator(id);

  const existingTransaction = await findMembershipTransactionById(id);

  if (!existingTransaction) {
    return errorHandler("Transaction not found", 404);
  }

  const updateData: Partial<MembershipType> = {};

  if (name !== undefined) updateData.name = name;
  if (purpose !== undefined) updateData.purpose = purpose;
  if (amount !== undefined && amount !== "") updateData.amount = amount;
  if (description !== undefined) updateData.description = description;

  if (Object.keys(updateData).length === 0) {
    return errorHandler("No membership transaction data provided", 400);
  }

  await updateMembershipTransactionById(id, updateData);

  responseHandler(res, true, 200, "Updated membership transaction successfully", null);
});

export const deleteTransaction = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return errorHandler("ID not found", 400);
  }

  ObjectIdValidator(id);

  const existingTransaction = await findMembershipTransactionById(id);

  if (!existingTransaction) {
    return errorHandler("Transaction not exists", 404);
  }

  await deleteUploadedFile(existingTransaction.public_ids);
  await deleteMembershipTransactionById(id);

  responseHandler(res, true, 200, "Deleted membership transaction successfully", null);
});
