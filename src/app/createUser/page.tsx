"use client";

import { useState } from "react";
import axios from "axios";

export default function UploadPage() {
  const [userName, setUserName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!userName || !file) {
      setStatus("Please provide both username and image");
      return;
    }

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("file", file);

    try {
      setStatus("Uploading...");

      const res = await axios.post("/api2/createUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
if(res.status===202){
      setStatus("Upload successful 🎉");
      setUserName("");
      setFile(null);
}
    } catch  {
      
      setStatus( "Upload failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">Upload Image</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full border p-2 rounded"
      />

      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Upload
      </button>

      {status && (
        <p className="text-center text-sm text-gray-700">{status}</p>
      )}
    </div>
  );
}
