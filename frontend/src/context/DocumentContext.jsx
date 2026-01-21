import React, { createContext, useContext, useState } from "react";

const DocumentContext = createContext();

export function DocumentProvider({ children }) {
  const [documents, setDocuments] = useState([]);
  const [activeDocument, setActiveDocument] = useState(null);
  const [messages, setMessages] = useState({});

  // ✅ ADD DOCUMENT
  const addDocument = (doc) => {
    setDocuments((prev) => [...prev, doc]);
  };

  // ✅ REMOVE DOCUMENT
  const removeDocument = (id) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    setMessages((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  // ✅ GET MESSAGES
  const getMessagesForActiveDoc = () => {
    if (!activeDocument) return [];
    return messages[activeDocument.id] || [];
  };

  // ✅ ADD / REPLACE MESSAGE (🔥 FIX HERE 🔥)
  const addMessageToActiveDoc = (msg) => {
    if (!activeDocument) return;

    setMessages((prev) => {
      const docId = activeDocument.id;
      const current = prev[docId] || [];

      // 🔁 REPLACE MESSAGE BY ID
      if (msg.replace) {
        return {
          ...prev,
          [docId]: current.map((m) =>
            m.id === msg.id ? { ...m, ...msg, loading: false } : m
          ),
        };
      }

      // ➕ NORMAL ADD
      return {
        ...prev,
        [docId]: [...current, msg],
      };
    });
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        activeDocument,
        setActiveDocument,
        addDocument,
        removeDocument,
        getMessagesForActiveDoc,
        addMessageToActiveDoc,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  return useContext(DocumentContext);
}
