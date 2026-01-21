package com.example.rag;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class OllamaChatClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String url = "http://localhost:11434/api/generate";

    public String ask(String context, String question) {

        Map<String, Object> body = new HashMap<>();
        body.put("model", "llama3.2");
        body.put("prompt",
                "Use the context below to answer the question.\n\n"
                        + "Context:\n" + context
                        + "\nQuestion:\n" + question
        );
        body.put("stream", false);

        Map<?, ?> response =
                restTemplate.postForObject(url, body, Map.class);

        return response.get("response").toString();
    }
}
