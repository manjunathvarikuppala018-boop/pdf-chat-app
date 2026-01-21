import React from "react";

export default function UploadBox({ onFiles }) {
  const onDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(
      (f) => f.type === "application/pdf"
    );
    onFiles(files);
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files).filter(
      (f) => f.type === "application/pdf"
    );
    onFiles(files);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
    >
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={onChange}
        className="hidden"
        id="pdf-upload"
      />
      <label htmlFor="pdf-upload" className="block text-gray-600">
        Drag & drop PDFs here or click to upload
      </label>
    </div>
  );
}
