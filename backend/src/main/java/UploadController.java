package com.example.rag;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
@RestController
@RequestMapping("/api")
@CrossOrigin
public class UploadController {

    private final PdfService pdfService;

    public UploadController(PdfService pdfService) {
        this.pdfService = pdfService;
    }

    @PostMapping("/upload")
public DocumentInfo uploadPdf(@RequestParam("file") MultipartFile file) throws Exception {
    File uploadDir = new File("uploads");
    uploadDir.mkdirs();

    File savedFile = new File(uploadDir, file.getOriginalFilename());
    Files.copy(
        file.getInputStream(),
        savedFile.toPath(),
        java.nio.file.StandardCopyOption.REPLACE_EXISTING
    );

    return pdfService.processPdf(savedFile);
}


    @GetMapping("/documents")
    public List<DocumentInfo> listDocuments() {
        return pdfService.getAllDocuments();
    }

    @GetMapping("/documents/{id}")
    public DocumentInfo getDocument(@PathVariable String id) {
        return pdfService.getDocumentById(id);
    }
    @GetMapping("/documents/{id}/file")
public ResponseEntity<Resource> getPdfFile(@PathVariable String id) throws Exception {

    DocumentInfo doc = pdfService.getDocumentById(id);
    if (doc == null || doc.getPath() == null) {
        return ResponseEntity.notFound().build();
    }

    Path filePath = Paths.get(doc.getPath());
    Resource resource = new UrlResource(filePath.toUri());

    if (!resource.exists()) {
        return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_PDF)
            .header(HttpHeaders.CONTENT_DISPOSITION,
                    "inline; filename=\"" + doc.getName() + "\"")
            .body(resource);
}
    @DeleteMapping("/documents/{id}")
    public void deleteDocument(@PathVariable String id) {
        pdfService.removeDocument(id);
    }
}
