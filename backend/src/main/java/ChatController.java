package com.example.rag;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ChatController {

    private final PdfService pdfService;
    private final RestTemplate restTemplate = new RestTemplate();

    public ChatController(PdfService pdfService) {
        this.pdfService = pdfService;
    }

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatRequest request) {

        DocumentInfo doc = pdfService.getDocumentById(request.getDocumentId());
        if (doc == null) {
            return new ChatResponse("Document not found");
        }

        String prompt = """
        You are a helpful assistant.
        Answer the question using ONLY the context below.

        Context:
        %s

        Question:
        %s
        """.formatted(doc.getText(), request.getQuestion());

        Map<String, Object> body = new HashMap<>();
        body.put("model", "llama3");
        body.put("prompt", prompt);
        body.put("stream", false);

        Map<?, ?> response = restTemplate.postForObject(
                "http://localhost:11434/api/generate",
                body,
                Map.class
        );

        String answer = response.get("response").toString();
        return new ChatResponse(answer);
    }
}
