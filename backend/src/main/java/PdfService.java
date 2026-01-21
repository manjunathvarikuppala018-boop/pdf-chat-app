package com.example.rag;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PdfService {

    private final Map<String, DocumentInfo> documents = new ConcurrentHashMap<>();
    private final TextChunker textChunker;

    public PdfService(TextChunker textChunker) {
        this.textChunker = textChunker;
    }

    public DocumentInfo processPdf(File file) throws Exception {
        String id = UUID.randomUUID().toString();

        String extractedText;
        try (PDDocument pdf = PDDocument.load(file)) {
            PDFTextStripper stripper = new PDFTextStripper();
            extractedText = stripper.getText(pdf);
        }

        // Chunking (kept for RAG)
        textChunker.chunk(extractedText);

        // ✅ CORRECT constructor usage
        DocumentInfo doc = new DocumentInfo(
                id,
                file.getName(),
                extractedText,              // text
                file.getAbsolutePath(),     // path
                Instant.now()
        );

        documents.put(id, doc);
        return doc;
    }

    public List<DocumentInfo> getAllDocuments() {
        return new ArrayList<>(documents.values());
    }

    public DocumentInfo getDocumentById(String id) {
        return documents.get(id);
    }

    public void removeDocument(String id) {
        documents.remove(id);
    }
}
