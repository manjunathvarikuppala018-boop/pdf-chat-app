# 📘 PDF Chat Application (RAG-based)

A full-stack **PDF Chat Application** that allows users to upload PDFs and ask questions about their content using **Retrieval-Augmented Generation (RAG)** powered by **Spring Boot, React, and Ollama (LLM)**.

---

## 🚀 Features

- Upload PDF documents
- Preview uploaded PDFs
- Ask natural language questions about the document
- Context-aware answers using RAG
- Chat history per document
- Clean and modern UI

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- JavaScript
- Axios

### Backend
- Java 21
- Spring Boot
- Apache PDFBox
- Ollama (LLM – llama3)
- REST APIs

---
## 📂 Project Structure

pdf-chat-app/
├── frontend/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/ # Spring Boot backend
│ ├── src/main/java
│ ├── src/main/resources
│ └── pom.xml
│
└── README.md
---

## ▶️ How to Run the Project

### 1️⃣ Prerequisites
- Node.js (v18+)
- Java 21
- Maven
- Ollama installed and running
- Ollama model pulled:
```bash
ollama pull llama3
## 📂 Project Structure

