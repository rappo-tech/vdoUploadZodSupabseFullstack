// utils/cloudinaryUtils.ts
import cloudinary from "../lib/cloudinaryConfig";


// ✅ Type to replace `any`
type FileMeta = {
  type: string;
  size: number;
};

// ✅ Validate file (type + size)
export const validateFile = (file: FileMeta) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
  const maxSize = 50 * 1024 * 1024; // 50MB

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Invalid file type' };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: 'File too large (max 10MB)' };
  }

  return { isValid: true };
};
//  gnerateFileName
export const generateFileName = (originalName: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop() || 'jpg';
  return `${timestamp}_${randomString}.${extension}`;
};
//upload from clodinary
export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  fileName: string
): Promise<{ publicId: string; url: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        public_id: fileName,
        folder: "your-folder-name", // you can change this to any folder in your Cloudinary account
        resource_type: "auto",
        quality: "auto",
        fetch_format: "auto",
        // Optional: Add transformation optimizations
        flags: "progressive",
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else if (result) {
          resolve({
            publicId: result.public_id,
            url: result.secure_url,
          });
        } else {
          reject(new Error('Upload failed - no result returned'));
        }
      }
    ).end(fileBuffer);
  });
};
// ✅ Delete from Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};