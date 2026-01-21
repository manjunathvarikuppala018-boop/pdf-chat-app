package com.example.rag;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class OllamaService {

    @Value("${ollama.base.url}")
    private String ollamaBaseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String ask(String prompt) {

        Map<String, Object> body = new HashMap<>();
        body.put("model", "llama3");
        body.put("prompt", prompt);
        body.put("stream", false);

        Map response = restTemplate.postForObject(
                ollamaBaseUrl + "/api/generate",
                body,
                Map.class
        );

        if (response == null || !response.containsKey("response")) {
            return "No response from model";
        }

        return response.get("response").toString();
    }
}
