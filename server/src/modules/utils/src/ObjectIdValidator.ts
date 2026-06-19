import mongoose from "mongoose";

import { errorHandler } from "@modules/utils/index";

const objectIdValidator = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorHandler("Invalid ID", 400);
  }
};

export default objectIdValidator;
