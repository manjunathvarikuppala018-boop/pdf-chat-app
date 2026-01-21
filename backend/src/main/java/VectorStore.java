package com.example.rag;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Component
public class VectorStore {

    public static class VectorEntry {
        public final String documentId;
        public final String text;
        public final List<Double> embedding;

        public VectorEntry(String documentId, String text, List<Double> embedding) {
            this.documentId = documentId;
            this.text = text;
            this.embedding = embedding;
        }
    }

    private final List<VectorEntry> store = new ArrayList<>();

    public void add(String documentId, String text, List<Double> embedding) {
        store.add(new VectorEntry(documentId, text, embedding));
    }

    public List<VectorEntry> search(List<Double> queryEmbedding, int topK) {
        return store.stream()
                .sorted(Comparator.comparingDouble(
                        v -> -cosineSimilarity(queryEmbedding, v.embedding)
                ))
                .limit(topK)
                .toList();
    }

    private double cosineSimilarity(List<Double> a, List<Double> b) {
        double dot = 0.0;
        double normA = 0.0;
        double normB = 0.0;

        for (int i = 0; i < a.size(); i++) {
            dot += a.get(i) * b.get(i);
            normA += Math.pow(a.get(i), 2);
            normB += Math.pow(b.get(i), 2);
        }

        return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-10);
    }
}
