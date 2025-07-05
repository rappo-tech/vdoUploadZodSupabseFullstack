import { NextRequest, NextResponse } from "next/server";
import { uploadSchema } from "../../../../zodSchemas/imgNVdoScema";
import prisma from "../../../../lib/prisma";
import { generateFileName, uploadToCloudinary } from "../../../../utils/cloudinaryUtilis";

export async function POST(req: NextRequest) {
  console.log('1.backend req came');
  
  try {
    const formData = await req.formData();
    console.log(`2.formData received`);

    const file = formData.get("file") as File;
    const userName = formData.get("userName") as string;
    console.log(`3.username: ${userName}, file: ${file?.name}`);

    // Zod validation
    const parseResult = uploadSchema.safeParse({ userName, file });
    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.flatten() }, { status: 400 });
    }
    console.log(`4.zod validation done`);

    // Convert to buffer (NO BASE64 ENCODING)
    const bytes = await file.arrayBuffer();//broswer buffer 
    const buffer = Buffer.from(bytes);//node js buffer 
    console.log(`5.buffer created (size: ${buffer.length} bytes)`);

    // Generate file name
    const fileName = generateFileName(file.name);
    console.log(`6.fileName generated: ${fileName}`);

    // Upload to Cloudinary with binary data
    const { publicId, url } = await uploadToCloudinary(buffer, fileName);
    console.log(`7.upload to cloudinary is done`);

    // Save to DB
    const newUser = await prisma.allUsers.create({
      data: {
        userName,
        imgUrl: url,
        publicId,
      },
    });
    console.log(`8.prisma is also done`);

    return NextResponse.json({ 
      message: "Upload successful", 
      user: newUser 
    }, { status: 201 });

  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: err instanceof Error ? err.message : "Unknown error"
    }, { status: 500 });
  }
}