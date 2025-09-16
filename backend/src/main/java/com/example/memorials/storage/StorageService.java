package com.example.memorials.storage;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Optional;

public interface StorageService {
    String save(MultipartFile file) throws IOException;
    Optional<byte[]> load(String key) throws IOException;
    String contentType(String key);
    void delete(String key) throws IOException;
}
