// File: app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { uploadSchema } from "../../../../zodSchemas/imgSchema";
import prisma from "../../../../lib/prisma";
import { generateFileName,uploadToCloudinary } from "../../../../utils/cloudinaryUtilis";


export async function POST(req: NextRequest) {
console.log('1.backend req came ')
  try {
    const formData = await req.formData();
    console.log(`2.${formData}`)

    const file = formData.get("file") as File;
    const userName = formData.get("userName") as string;
console.log(`3.usernmae;${userName},file:${file}`)
    // Zod validation
    const parseResult = uploadSchema.safeParse({ userName, file });
    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.flatten() }, { status: 400 });
    }
console.log(`4.zod validation done `)
    // Convert to buffer and base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
console.log(`5.base64 is done `)
    // Generate file name
    const fileName = generateFileName(file.name);
console.log(`6.fileName generated `)
    // Upload to Cloudinary
    const { publicId, url } = await uploadToCloudinary(base64, fileName);
console.log(`7.uplaod to cloudnary is done `)
    // Save to DB
    const newUser = await prisma.allUsers.create({
      data: {
        userName,
        imgUrl: url,
        publicId,
      },
    });
console.log(`8.prisma is also done `)
    return NextResponse.json({ message: "Upload successful", user: newUser },{status:202});
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
