import React, { useState } from "react";
import { uploadPdf } from "../api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return setMsg("Select a PDF first.");
    setMsg("Uploading...");
    try {
      const data = await uploadPdf(file);
      setMsg(`Uploaded: ${data.name} (id: ${data.id})`);
      // emit a custom event so DocumentsList can refresh
      window.dispatchEvent(new Event("documents:changed"));
    } catch (err) {
      console.error(err);
      setMsg("Upload failed: " + (err?.response?.data || err.message));
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-medium mb-2">Upload PDF</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="mb-3"
        />
        <div>
          <button className="px-3 py-1 bg-blue-600 text-white rounded" type="submit">Upload</button>
        </div>
      </form>
      <p className="mt-2 text-sm text-gray-600">{msg}</p>
    </div>
  );
}
