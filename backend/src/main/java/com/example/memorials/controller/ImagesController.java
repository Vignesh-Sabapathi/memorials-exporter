package com.example.memorials.controller;

import com.example.memorials.storage.StorageService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/images")
public class ImagesController {

    private final StorageService storage;

    public ImagesController(StorageService storage) {
        this.storage = storage;
    }

    @GetMapping("/{key:.+}")
    public ResponseEntity<byte[]> get(@PathVariable("key") String key) throws IOException {
        Optional<byte[]> data = storage.load(key);
        if (data.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        String contentType = storage.contentType(key);
        return ResponseEntity.ok()
                .header(HttpHeaders.CACHE_CONTROL, "public, max-age=31536000, immutable")
                .contentType(MediaType.parseMediaType(contentType == null ? "application/octet-stream" : contentType))
                .body(data.get());
    }
}
