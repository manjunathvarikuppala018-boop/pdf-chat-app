import React, { useState } from "react";
import api from "../api";
import { useDocuments } from "../context/DocumentContext";

export default function UploadPage() {
  const { addDocument } = useDocuments();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // ✅ MUST be "file"

    try {
      setUploading(true);

      // ❗ DO NOT set Content-Type manually
      const res = await api.post("/upload", formData);

      // backend returns DocumentInfo
      addDocument(res.data);

      alert("Upload successful ✅");
      setFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-20 max-w-xl mx-auto">
      <div className="border rounded-xl p-10 bg-white text-center">
        <h1 className="text-2xl font-semibold mb-2">Upload PDF</h1>
        <p className="text-sm text-gray-500 mb-6">
          Upload a PDF to start chatting with it
        </p>

        <label className="block border-2 border-dashed rounded-lg p-6 cursor-pointer text-blue-600 hover:bg-blue-50">
          {file ? file.name : "Click to select PDF"}
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`mt-6 w-full py-2 rounded-lg text-white ${
            uploading
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}
