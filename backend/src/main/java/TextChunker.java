package com.example.rag;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TextChunker {

    // Safe chunking: max 500 characters per chunk
    public List<String> chunk(String text) {
        List<String> chunks = new ArrayList<>();

        if (text == null || text.isBlank()) {
            return chunks;
        }

        int chunkSize = 500;
        int length = text.length();

        for (int start = 0; start < length; start += chunkSize) {
            int end = Math.min(start + chunkSize, length);
            chunks.add(text.substring(start, end));
        }

        return chunks;
    }
}
