package com.example.memorials.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

@Service
public class LocalStorageService implements StorageService {

    private final Path root;

    public LocalStorageService(@Value("${app.storage.local.path:uploads}") String path) throws IOException {
        this.root = Path.of(path).toAbsolutePath();
        Files.createDirectories(root);
    }

    @Override
    public String save(org.springframework.web.multipart.MultipartFile file) throws IOException {
        String original = StringUtils.cleanPath(file.getOriginalFilename() == null ? "file" : file.getOriginalFilename());
        String ext = "";
        int dot = original.lastIndexOf('.');
        if (dot >= 0) ext = original.substring(dot);
        String key = "products/" + UUID.randomUUID() + ext;
        Path dest = root.resolve(key);
        Files.createDirectories(dest.getParent());
        Files.copy(file.getInputStream(), dest, StandardCopyOption.REPLACE_EXISTING);
        return key;
    }

    @Override
    public Optional<byte[]> load(String key) throws IOException {
        Path p = root.resolve(key).normalize();
        if (Files.exists(p)) {
            return Optional.of(Files.readAllBytes(p));
        }
        return Optional.empty();
    }

    @Override
    public String contentType(String key) {
        try {
            return Files.probeContentType(root.resolve(key).normalize());
        } catch (IOException e) {
            return "application/octet-stream";
        }
    }

    @Override
    public void delete(String key) throws IOException {
        Path p = root.resolve(key).normalize();
        Files.deleteIfExists(p);
    }
}
