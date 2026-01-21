import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDocuments } from "../context/DocumentContext";

export default function DocumentsPage() {
  const { documents, removeDocument, setActiveDocument } = useDocuments();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (doc) => {
    setSelectedDoc(doc);
  };

  const handleChat = () => {
    if (!selectedDoc) return;
    setActiveDocument(selectedDoc);
    navigate("/chat");
  };

  const handleRemove = () => {
    if (!selectedDoc) return;
    removeDocument(selectedDoc.id);
    setSelectedDoc(null);
  };

  return (
    <div className="p-20 max-w-20xl mx-auto">
      {/* Header */}
      <div className="mb-20">
        <h1 className="text-2xl font-semibold">Documents</h1>
        <p className="text-sm text-gray-500">
          Manage your uploaded PDF files
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* LEFT: Document List */}
        <div className="border rounded-lg p-6">
          {documents.length === 0 && (
            <p className="text-sm text-gray-400 text-center">
              No documents uploaded
            </p>
          )}

          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => handleSelect(doc)}
              className={`w-full text-left px-3 py-2 rounded text-sm mb-1 ${
                selectedDoc?.id === doc.id
                  ? "bg-blue-50 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
            >
              {doc.name}
            </button>
          ))}
        </div>

        {/* RIGHT: Details */}
        <div className="col-span-2 border rounded-lg p-10">
          {!selectedDoc ? (
  <div className="h-full flex items-center justify-center text-gray-400">
    No document selected
  </div>
) : (
  <>
    <h2 className="text-lg font-medium mb-4">
      {selectedDoc.name}
    </h2>

    {/* PDF PREVIEW */}
    <div className="h-96 border rounded mb-6 overflow-hidden bg-gray-50">
      <iframe
        title="PDF Preview"
        src={`http://localhost:8081/api/documents/${selectedDoc.id}/file`}
        className="w-full h-full"
      />
    </div>

    <div className="flex gap-3">
      <button
        onClick={handleChat}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Chat with this document
      </button>

      <button
        onClick={handleRemove}
        className="px-4 py-2 border rounded"
      >
        Remove
      </button>
    </div>
  </>
)}
        </div>
      </div>
    </div>
  );
}
