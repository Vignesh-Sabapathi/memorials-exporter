package com.example.memorials.controller;

import com.example.memorials.dto.ProductDto;
import com.example.memorials.service.ProductService;
import com.example.memorials.storage.StorageService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
public class AdminController {

    private final ProductService service;
    private final StorageService storage;

    public AdminController(ProductService service, StorageService storage) {
        this.service = service;
        this.storage = storage;
    }

    @PostMapping("/products")
    public ProductDto create(@RequestBody ProductDto dto) {
        return service.create(dto);
    }

    @PutMapping("/products/{id}")
    public ProductDto update(@PathVariable Long id, @RequestBody ProductDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/products/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PostMapping(value = "/uploads", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Map<String, Object> upload(@RequestParam("file") MultipartFile file) throws IOException {
        String key = storage.save(file);
        Map<String, Object> res = new HashMap<>();
        res.put("key", key);
        return res;
    }
}
