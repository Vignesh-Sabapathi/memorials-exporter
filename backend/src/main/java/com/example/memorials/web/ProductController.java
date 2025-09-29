package com.example.memorials.web;


import com.example.memorials.dto.ProductDto;
import com.example.memorials.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = {"*"})
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    /** Returns the latest N (default 15) products ordered by created_at desc. */
    @GetMapping("/first")
    public ResponseEntity<List<ProductDto>> first() {
        return ResponseEntity.ok(service.getFirstProducts());
    }

    /** Returns up to 125 products ordered by created_at desc. Optional ?limit=... (<=125). */
    @GetMapping("/all")
    public ResponseEntity<List<ProductDto>> all(
            @RequestParam(value = "limit", required = false) Integer limit) {
        return ResponseEntity.ok(service.getAllCapped(limit));
    }
}

