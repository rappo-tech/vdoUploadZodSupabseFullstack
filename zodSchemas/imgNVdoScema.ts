import { z } from "zod";

export const uploadSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 50 * 1024 * 1024, {
      message: "File size must be under 50MB",
    })
    .refine((file) => ["image/jpeg", "image/png", "image/webp",'video/mp4', 'video/webm' ].includes(file.type), {
      message: "Only JPEG, PNG, or WebP files are allowed",
    }),
});

export type UploadInput = z.infer<typeof uploadSchema>;
