import dotenv from "dotenv";
import { v7 as uuidv7 } from "uuid";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const IMAGE_MAX_DIMENSION = 1700;
const IMAGE_QUALITY = 90;

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || "",
    api_key: process.env.CLOUD_API_KEY || "",
    api_secret: process.env.CLOUD_API_SECRET || "",
  });
};

export const fileUploader = async (file: Buffer) => {
  configureCloudinary();

  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        format: "webp",
        public_id: uuidv7(),
        transformation: [
          {
            width: IMAGE_MAX_DIMENSION,
            height: IMAGE_MAX_DIMENSION,
            crop: "limit",
            quality: IMAGE_QUALITY,
          },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary upload failed"));
          return;
        }

        resolve(result);
      },
    );

    stream.end(file);
  });

  return uploadResult;
};

export const deleteUploadedFile = async (publicId: string) => {
  configureCloudinary();

  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
};
