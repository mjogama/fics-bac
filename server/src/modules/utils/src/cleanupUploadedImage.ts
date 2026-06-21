import { deleteUploadedFile } from "./fileUploader";

const cleanupUploadedOfficerImage = async (publicId: string, path: string) => {
  try {
    await deleteUploadedFile(publicId);
  } catch (error) {
    console.error(`Failed to clean up uploaded ${path} image from Cloudinary:`, error);
  }
};

export default cleanupUploadedOfficerImage;
