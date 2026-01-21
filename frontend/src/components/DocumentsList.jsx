import React, { useEffect, useState } from "react";
import { fetchDocuments } from "../api";

export default function DocumentsList({ activeDoc, onSelect }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments()
      .then(setDocs)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading documents...</p>;
  }

  if (docs.length === 0) {
    return <p className="text-sm text-gray-500">No documents uploaded</p>;
  }

  return (
    <div className="space-y-2">
      {docs.map((doc) => (
        <button
          key={doc.id}
          onClick={() => onSelect(doc)}
          className={`w-full text-left p-2 rounded border ${
            activeDoc?.id === doc.id
              ? "bg-blue-100 border-blue-500"
              : "hover:bg-gray-100"
          }`}
        >
          {doc.name}
        </button>
      ))}
    </div>
  );
}
