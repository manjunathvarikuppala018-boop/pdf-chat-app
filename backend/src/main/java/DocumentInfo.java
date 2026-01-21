package com.example.rag;

import java.time.Instant;

public class DocumentInfo {

    private String id;
    private String name;
    private String text;
    private String path;
    private Instant createdAt;

    public DocumentInfo() {}

    public DocumentInfo(String id, String name, String text, String path, Instant createdAt) {
        this.id = id;
        this.name = name;
        this.text = text;
        this.path = path;
        this.createdAt = createdAt;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getText() { return text; }
    public String getPath() { return path; }
    public Instant getCreatedAt() { return createdAt; }

    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setText(String text) { this.text = text; }
    public void setPath(String path) { this.path = path; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
