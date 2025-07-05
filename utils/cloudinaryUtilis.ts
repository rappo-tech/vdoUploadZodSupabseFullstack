// utils/cloudinaryUtils.ts
import cloudinary from "../lib/cloudinaryConfig";
import fs from "fs/promises";
import path from "path";

// ✅ Type to replace `any`
type FileMeta = {
  type: string;
  size: number;
};

// ✅ Validate file (type + size)
export const validateFile = (file: FileMeta) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Invalid file type' };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: 'File too large (max 10MB)' };
  }

  return { isValid: true };
};

// ✅ Generate a unique file name
export const generateFileName = (originalName: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = path.extname(originalName);
  return `${timestamp}_${random}${ext}`;
};

// ✅ Convert file to base64 (used in traditional Node.js file handling, optional in App Router)
export const convertToBase64 = async (filepath: string): Promise<string> => {
  const data = await fs.readFile(filepath);
  return `data:image/jpeg;base64,${data.toString("base64")}`;
};

// ✅ Upload to Cloudinary
export const uploadToCloudinary = async (
  base64: string,
  fileName: string
): Promise<{ publicId: string; url: string }> => {
  const result = await cloudinary.uploader.upload(base64, {
    public_id: fileName,
    folder: "your-folder-name", // you can change this to any folder in your Cloudinary account
    resource_type: "auto",
  });

  return {
    publicId: result.public_id,
    url: result.secure_url,
  };
};

// ✅ Delete from Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};