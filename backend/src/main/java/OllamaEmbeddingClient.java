package com.example.rag;

import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Component
public class OllamaEmbeddingClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String OLLAMA_URL = "http://localhost:11434/api/embeddings";

    public List<Double> embed(String text) {
        Map<String, Object> body = Map.of(
                "model", "nomic-embed-text",
                "prompt", text
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(body, headers);

        ResponseEntity<Map> response =
                restTemplate.postForEntity(OLLAMA_URL, entity, Map.class);

        return (List<Double>) response.getBody().get("embedding");
    }
}
