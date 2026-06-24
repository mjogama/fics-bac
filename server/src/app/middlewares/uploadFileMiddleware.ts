import path from "path";
import multer from "multer";

import { createAppError } from "@modules/utils/index";
import { IMAGE_EXTENSION } from "@app/constants/IMAGE_EXTESION";

const uploadFileMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (_req, file, callback) => {
    const fileExtension = path.extname(file.originalname).slice(1).toLowerCase();

    if (!IMAGE_EXTENSION.includes(fileExtension)) {
      callback(createAppError(`Only ${IMAGE_EXTENSION.join(", ")}, image extension are allowed`, 400));
      return;
    }

    callback(null, true);
  },
});

export default uploadFileMiddleware;
